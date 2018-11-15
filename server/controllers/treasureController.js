module.exports = {

    dragonTreasure: async (req, res) => {
        let db = req.app.get('db')

        let treasure = await db.get_dragon_treasure(1)

        return res.status(200).send(treasure)
    },

    getMyTreasure: async (req, res) => {
        let db = req.app.get('db')
        let { id } = req.session.user

        let myTreasure = await db.get_my_treasure([id])

        return res.status(200).send(myTreasure)
    },

    getAllTreasure: async (req, res) => {
        let db = req.app.get('db')

        let allTreasure = await db.get_all_treasure()

        return res.status(200).send(allTreasure)
    },

    addMyTreasure: async (req, res) => {
        let db = req.app.get('db')
        let { treasureURL } = req.body
        let { id } = req.session.user

        const myTreasure = await db.add_user_treasure([treasureURL, id])
        return res.status(201).send(myTreasure)
    }

}