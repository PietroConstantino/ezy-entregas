// Lógica de GET /api/buscas — lista o histórico de buscas salvas, mais recente primeiro.
// Usa a service role key (nunca a anon key) porque roda só no servidor;
// por isso continua funcionando normalmente mesmo depois de ativar o RLS na tabela.

export async function onRequestGet(context) {
  const { env } = context;

  if (!env.SUPABASE_URL || !env.SUPABASE_SERVICE_KEY) {
    return new Response(
      JSON.stringify({ erro: 'SUPABASE_URL / SUPABASE_SERVICE_KEY não configurados na Function.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const url = `${env.SUPABASE_URL}/rest/v1/buscas?select=*&order=criado_em.desc&limit=30`;

  const resp = await fetch(url, {
    headers: {
      apikey: env.SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${env.SUPABASE_SERVICE_KEY}`,
    },
  });

  if (!resp.ok) {
    const detalhe = await resp.text();
    return new Response(
      JSON.stringify({ erro: 'Não foi possível carregar as buscas salvas.', detalhe }),
      { status: 502, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const buscas = await resp.json();

  return new Response(JSON.stringify({ buscas }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
