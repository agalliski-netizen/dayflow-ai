export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    const { description, lang = 'en' } = req.body;
      if (!description?.trim()) return res.status(400).json({ error: 'Description is required' });
        const isEs = lang === 'es';
          const systemPrompt = isEs
              ? `Sos DayFlow AI, un planificador experto. El usuario describe su día en lenguaje natural. Creá un horario optimizado. Identificá eventos con hora fija y organizá todo alrededor. Estimá traslados (15-30 min). Tareas exigentes a la mañana. Descansos cada 90 min. Devolvé SOLO JSON válido: {"summary":"estrategia","schedule":[{"time":"09:00","task":"tarea","duration":"1h","note":"nota"}],"tips":["consejo"]}`
                  : `You are DayFlow AI, an expert scheduler. User describes their day in natural language. Create an optimized schedule. Identify fixed-time events and schedule around them. Estimate travel time (15-30 min). Hard tasks in the morning. Return ONLY valid JSON: {"summary":"strategy","schedule":[{"time":"09:00","task":"task","duration":"1h","note":"note"}],"tips":["tip"]}`;
                    try {
                        const response = await fetch('https://api.anthropic.com/v1/messages', {
                              method: 'POST',
                                    headers: { 'Content-Type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
                                          body: JSON.stringify({ model: 'claude-sonnet-4-20250514', max_tokens: 1500, system: systemPrompt, messages: [{ role: 'user', content: description }] })
                                              });
                                                  if (!response.ok) { const e = await response.text(); return res.status(response.status).json({ error: e }); }
                                                      const data = await response.json();
                                                          const text = data.content?.map(b => b.text || '').join('') || '';
                                                              const clean = text.replace(/```json\n?|```\n?/g, '').trim();
                                                                  let plan;
                                                                      try { plan = JSON.parse(clean); } catch { return res.status(500).json({ error: 'Parse error', raw: clean }); }
                                                                          return res.status(200).json(plan);
                                                                            } catch (error) {
                                                                                return res.status(500).json({ error: error.message });
                                                                                  }
                                                                                  }
