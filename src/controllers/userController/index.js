import admin from '../../configs/firebase'
import { User } from '../../models'

class UserController {
    static createUser = async (req, res) => {
            try {
                console.log(req.body)
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
                console.log(e)
            }
        }
}

export default UserController