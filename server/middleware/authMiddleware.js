module.exports = {

    usersOnly: (req, res, next) => {
        let { user } = req.session

        if (!user) {
            return res.status(401).send('Please log in')
        }
        next()
    },

    adminsOnly: (req, res, next) => {
        let { isAdmin } = req.session.user

        if (!isAdmin) {
            return res.status(403).send('You are not an admin')
        }
        next()
    }

}