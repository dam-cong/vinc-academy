// Đếm lượt xem bài blog: GET ?slug=a,b (đọc) · POST ?slug=a (tăng 1, chống trùng 1 giờ/IP)
const crypto = require('crypto');
const URL_ = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
const SLUG = /^[a-z0-9-]{1,80}$/;

const redis = async cmds => {
    const r = await fetch(`${URL_}/pipeline`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${TOKEN}` },
        body: JSON.stringify(cmds),
    });
    return (await r.json()).map(x => x.result);
};

module.exports = async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    const slugs = String(req.query.slug || '').split(',').filter(Boolean);
    if (!['GET', 'POST'].includes(req.method) || !slugs.length || slugs.length > 20 || !slugs.every(s => SLUG.test(s)))
        return res.status(400).json({ error: 'bad request' });
    if (!URL_ || !TOKEN) return res.status(200).json({});
    try {
        const keys = slugs.map(s => `views:${s}`);
        let counts;
        if (req.method === 'POST') {
            const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim();
            const seen = `seen:${crypto.createHash('sha256').update(ip + slugs[0]).digest('hex').slice(0, 24)}`;
            const [ok] = await redis([['SET', seen, '1', 'NX', 'EX', '3600']]);
            counts = await redis([[ok === 'OK' ? 'INCR' : 'GET', keys[0]]]);
        } else {
            res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
            [counts] = await redis([['MGET', ...keys]]);
        }
        res.status(200).json(Object.fromEntries(slugs.map((s, i) => [s, Number(counts[i]) || 0])));
    } catch {
        res.status(200).json({});
    }
};
