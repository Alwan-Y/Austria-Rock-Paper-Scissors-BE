import admin from '../../configs/firebase'
import { User } from '../../models'

class UserController {
    static createUser = async (req, res) => {
        try {
            const { email, username, password } = req.body

            const findEmail = await User.findOne({where: {email} })

            if ( findEmail ) {
                return res.status(400).json({message : 'Email already in use'})
            }
            const findUsername = await User.findOne({where: {username} })

            if ( findUsername) {
                return res.status(400).json({message : 'Username already in use'})
            }

            const registerUserInFirebase = admin.auth().createUser({
                email: email,
                password: password
            })

            const registerusernameInDatabase = await User.create({
                email,
                username
            })

            res.status(200).json({ message: 'Register succes, Happy playing ~'})
        } catch(e) {
            res.status(500).json({ message: `${e}`})
        }
    }

    static setUserToAdmin = async (req, res) => {
        try {
            const { userId } = req.body
        
            const userToAdmin = await admin.auth().setCustomUserClaims(userId, {
                admin: true
            })
    
            res.status(200).json({ message: 'Succes promote user to admin'})
        } catch(e) {
            res.status(500).json({ message: `${e}`})
        }
    }

    static getStatusUser = async (req, res) => {
        try {
            const { email } = req.body

            const status = await admin.auth().getUserByEmail(email)

            if ( status.customClaims.admin ) {
                
                return res.status(201).json({ message: 'This account is admin'})
            }
            
            return res.status(200).json({ message: 'This account not admin'})
        } catch(e) {
            res.status(500).json({ message: `${e}`})
        }
    }
}

export default UserController