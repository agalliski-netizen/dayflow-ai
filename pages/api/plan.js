export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    const { description, lang } = req.body;
    if (!description || !description.trim()) return res.status(400).json({ error: 'No description' });
    const sysEn = 'You are DayFlow AI, a personal scheduler. The user describes their day in natural language. Create an optimized schedule. Identify fixed-time events and schedule around them. Estimate travel time between locations (15-30 min). Hard tasks in the morning. Return ONLY valid JSON: {"summary":"strategy","schedule":[{"time":"09:00","task":"task","duration":"1h","note":"note"}],"tips":["tip"]}';
    const sysEs = 'Sos DayFlow AI, un planificador personal. El usuario describe su dia en lenguaje natural. Crea un horario optimizado. Identifica eventos con hora fija y organiza todo alrededor. Estima traslados (15-30 min). Tareas dificiles a la manana. Devuelve SOLO JSON valido: {"summary":"estrategia","schedule":[{"time":"09:00","task":"tarea","duration":"1h","note":"nota"}],"tips":["consejo"]}';
    const sys = lang === 'es' ? sysEs : sysEn;
    try {
          const r = await fetch('https://api.anthropic.com/v1/messages', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json', 'x-api-key': process.env.ANTHROPIC_API_KEY, 'anthropic-version': '2023-06-01' },
                  body: JSON.stringify({ model: 'claude-haiku-4-5-20251001', max_tokens: 1500, system: sys, messages: [{ role: 'user', content: description }] })
          });
          if (!r.ok) { const e = await r.text(); return res.status(r.status).json({ error: e }); }
          const data = await r.json();
          const text = data.content ? data.content.map(function(b) { return b.text || ''; }).join('') : '';
          const clean = text.replace(/```json/g, '').replace(/```/g, '').trim();
          var plan;
          try { plan = JSON.parse(clean); } catch(pe) { return res.status(500).json({ error: 'Parse error', raw: clean.substring(0, 200) }); }
          return res.status(200).json(plan);
    } catch(err) {
          return res.status(500).json({ error: err.message });
    }
}
