const { RateLimiterMemory } = require("rate-limiter-flexible");

const opts = {
    points: 6, // 6 points
    duration: 1, // Per second
};

const rateLimiter = new RateLimiterMemory(opts);

const rateLimiterMiddleware = (req,res,next)=>{
    rateLimiter.consume(req.ip)
        .then(() => {
            next()
        })
        .catch(() => {
            res.status(429).send('too many request')
        });
}

module.exports = rateLimiterMiddleware