module.exports = (req, res) => {
    console.log(req.user);
    if (req.user) {
        res.json({ status: "OK" });
    } else {
        // 미들웨어로부터 token expired 메세지를 넘겨 받으려면..?
        res.json({ status: "Bad", message: "jwt expired" });
    }
};
