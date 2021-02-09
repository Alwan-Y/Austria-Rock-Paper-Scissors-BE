import admin from '../../configs/firebase'
import { User, sequelize } from '../../models'

class UserController {
    static create = async (req, res) => {
      const transaction = await sequelize.transaction()

      try {
        const { email, username, password } = req.body

        const findEmail = await User.findOne({ where: { email } })

        if (findEmail) {
          return res.status(400).json({ message: 'Email already in use' })
        }
        const findUsername = await User.findOne({ where: { username } })

        if (findUsername) {
          return res.status(400).json({ message: 'Username already in use' })
        }

        const registerUserInFirebase = admin.auth().createUser({
          email,
          password,
        })

        const registerusernameInDatabase = await User.create({
          email,
          username,
        }, transaction)

        return res.status(200).json({ message: 'Register succes, Happy playing ~' })
      } catch (e) {
        return res.status(500).json({ message: `${e}` })
      }
    }

    static setUserToAdmin = async (req, res) => {
      try {
        const { userId } = req.body

        const userToAdmin = await admin.auth().setCustomUserClaims(userId, {
          admin: true,
        })

        res.status(200).json({ message: 'Succes promote user to admin' })
      } catch (e) {
        res.status(500).json({ message: `${e}` })
      }
    }

    static getStatusUser = async (req, res) => {
      try {
        const { email } = req.body

        const status = await admin.auth().getUserByEmail(email)

        const getUsername = await User.findOne({ where: { email } })

        const { username } = getUsername

        return res.status(200).json({ status, username })
      } catch (e) {
        return res.status(500).json({ message: `${e}` })
      }
    }

    static changePassword = async (req, res) => {
      try {
        const { uid, password } = req.body

        const update = await admin.auth().updateUser(uid, {
          password,
        })

        res.status(200).json({ message: 'Succes update password' })
      } catch (e) {
        res.status(500).json({ message: `${e}` })
      }
    }
}

export default UserController
