// Lógica de POST /api/buscar — recebe os parâmetros de busca, consulta a fonte de preços,
// filtra pelo mínimo de reputação e salva o resultado no Supabase.
//
// buscarTravelpayouts() ainda é um placeholder com dados de exemplo pros três modos —
// ver notas no histórico da conversa sobre a integração real de voo/pacote/hospedagem.
//
// geocodificar() já faz a chamada real à Geocoding API do Google (precisa de
// GOOGLE_MAPS_API_KEY nas variáveis de ambiente). A distância mostrada pro usuário
// é calculada de verdade (Haversine, linha reta) entre o ponto geocodificado
// e a coordenada de cada pousada — só as coordenadas das pousadas em si que ainda são
// mock, porque isso vem do Hotellook, que ainda não está plugado.

function distanciaKm(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const toRad = (g) => (g * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

async function geocodificar(lugar, env) {
  if (!env.GOOGLE_MAPS_API_KEY || !lugar) return null;
  try {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(lugar)}&key=${env.GOOGLE_MAPS_API_KEY}`;
    const resp = await fetch(url);
    const data = await resp.json();
    if (data.status !== 'OK' || !data.results || !data.results.length) return null;
    const loc = data.results[0].geometry.location;
    return { lat: loc.lat, lon: loc.lng, endereco: data.results[0].formatted_address };
  } catch (e) {
    console.error('Falha ao geocodificar', e);
    return null;
  }
}

function gerarMockVoo(origem, destino, data_ida, data_volta) {
  const companhias = [
    { nome: 'LATAM', nota: 4.3 },
    { nome: 'GOL', nota: 4.0 },
    { nome: 'Azul', nota: 4.5 },
    { nome: 'Voepass', nota: 3.4 },
  ];
  return companhias.map((c, i) => ({
    tipo: 'voo',
    origem, destino, data_ida, data_volta: data_volta || null,
    empresa: c.nome,
    hotel: null,
    nota: c.nota,
    preco: 380 + i * 95 + Math.round(Math.random() * 60),
  }));
}

function gerarMockPacote(origem, destino, data_ida, data_volta) {
  const combinacoes = [
    { empresa: 'LATAM', hotel: 'Ibis Budget', nota: 4.2 },
    { empresa: 'GOL', hotel: 'Mercure', nota: 4.4 },
    { empresa: 'Azul', hotel: 'Slaviero Slim', nota: 4.1 },
    { empresa: 'GOL', hotel: 'Hostel Central', nota: 3.6 },
  ];
  return combinacoes.map((c, i) => ({
    tipo: 'pacote',
    origem, destino, data_ida, data_volta: data_volta || null,
    empresa: c.empresa,
    hotel: c.hotel,
    nota: c.nota,
    preco: 720 + i * 140 + Math.round(Math.random() * 90),
  }));
}

// Coordenadas das pousadas ainda são MOCK (espalhadas de forma plausível ao redor
// de Visconde de Mauá) — troca pelas coordenadas reais quando o Hotellook entrar.
function gerarMockHospedagem(lugar, data_ida, data_volta, pontoRef) {
  const pousadas = [
    { nome: 'Pousada Vale Encantado', nota: 4.6, lat: -22.316, lon: -44.564 },
    { nome: 'Pousada Recanto da Serra', nota: 4.1, lat: -22.331, lon: -44.548 },
    { nome: 'Pousada do Riacho', nota: 4.4, lat: -22.309, lon: -44.571 },
    { nome: 'Chalés Mauá', nota: 3.9, lat: -22.345, lon: -44.552 },
  ];
  return pousadas.map((p, i) => ({
    tipo: 'hospedagem',
    lugar, origem: null, destino: lugar,
    data_ida, data_volta: data_volta || null,
    empresa: p.nome,
    hotel: null,
    nota: p.nota,
    lat: p.lat,
    lon: p.lon,
    distancia_km: pontoRef ? distanciaKm(pontoRef.lat, pontoRef.lon, p.lat, p.lon) : null,
    preco: 220 + i * 70 + Math.round(Math.random() * 50),
  }));
}

async function buscarTravelpayouts(params, env, pontoRef) {
  // MOCK — troca isso pela chamada real assim que tivermos token/marker confirmados
  // (e, pro modo hospedagem, o acesso aprovado à Hotel Search API).
  if (params.tipo === 'pacote') {
    return gerarMockPacote(params.origem, params.destino, params.data_ida, params.data_volta);
  }
  if (params.tipo === 'hospedagem') {
    return gerarMockHospedagem(params.destino, params.data_ida, params.data_volta, pontoRef);
  }
  return gerarMockVoo(params.origem, params.destino, params.data_ida, params.data_volta);
}

function erroJson(msg, status) {
  return new Response(JSON.stringify({ erro: msg }), {
    status: status || 400,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return erroJson('JSON inválido.');
  }

  const { tipo, origem, destino, lugar, data_ida, data_volta, nota_minima } = body;

  if (!tipo || !data_ida) {
    return erroJson('Preencha tipo e data de ida.');
  }
  if (tipo === 'hospedagem') {
    if (!destino && !lugar) return erroJson('Informe o lugar da busca.');
  } else if (!origem || !destino) {
    return erroJson('Preencha origem e destino.');
  }

  const lugarBuscado = destino || lugar;

  let pontoRef = null;
  let avisoGeo = null;
  if (tipo === 'hospedagem') {
    pontoRef = await geocodificar(lugarBuscado, env);
    if (!pontoRef) {
      avisoGeo = env.GOOGLE_MAPS_API_KEY
        ? `Não consegui localizar "${lugarBuscado}" no Google Maps.`
        : 'GOOGLE_MAPS_API_KEY não configurada — distância indisponível por enquanto.';
    }
  }

  const bruto = await buscarTravelpayouts(
    { tipo, origem, destino: lugarBuscado, data_ida, data_volta },
    env,
    pontoRef
  );

  const minimo = typeof nota_minima === 'number' ? nota_minima : 0;
  const resultados = bruto
    .filter((r) => r.nota >= minimo)
    .sort((a, b) => a.preco - b.preco);

  if (env.SUPABASE_URL && env.SUPABASE_SERVICE_KEY) {
    try {
      await fetch(`${env.SUPABASE_URL}/rest/v1/buscas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          apikey: env.SUPABASE_SERVICE_KEY,
          Authorization: `Bearer ${env.SUPABASE_SERVICE_KEY}`,
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          tipo,
          origem: origem || null,
          destino: lugarBuscado,
          data_ida,
          data_volta: data_volta || null,
          parametros: { nota_minima: minimo, ponto_geocodificado: pontoRef },
          resultados,
        }),
      });
    } catch (e) {
      console.error('Falha ao salvar busca no Supabase', e);
    }
  }

  return new Response(JSON.stringify({ resultados, aviso: avisoGeo }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
