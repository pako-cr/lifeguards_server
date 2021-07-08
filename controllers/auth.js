const User = require('../models/user')
const Enabled_User = require('../models/enabled_users')
const bcrypt = require('bcryptjs')
const { generateJWT } = require('../helpers/jwt')


const signUp = async(request, response) => {
    const { email, password } = request.body

    console.log(request.body);

    try {
        // Check if the user is a previously enabled user.
        const enabledUser = await Enabled_User.findOne({ email })

        if (!enabledUser) {
            return response.status(400).json({
                ok: false,
                msg: 'The user is not valid to sign up. Please try again with a valid email.'
            })
        }

        // Check if the user is not registered already.
        const userExist = await User.findOne({ email })

        if (userExist) {
            return response.status(400).json({
                ok: false,
                msg: 'The email is not valid. Please try again with a valid email.'
            })
        }

        // Create a new user instance.
        const user = new User(request.body)

        user.name = enabledUser.name

        // Encrypt password
        const salt = bcrypt.genSaltSync()
        user.password = bcrypt.hashSync(password, salt)

        await user.save()

        // Generate the JWT
        const token = await generateJWT(user._id)

        // Response
        response.json({
            ok: true,
            user,
            token
        })

    } catch (error) {
        console.log(`❌  An error occurred: ${error}.`)
        response.status(500).json({
            ok: false,
            msg: 'Unexpected error occurred. Please try again.'
        })
    }
}

const signIn = async(request, response) => {
    const { email, password } = request.body

    try {
        const userDB = await User.findOne({ email })

        if (!userDB) {
            return response.status(404).json({
                ok: false,
                msg: 'The email is not valid. Please try again with a valid email.'
            })
        }

        // Validate password
        const validPassword = bcrypt.compareSync(password, userDB.password)

        if (!validPassword) {
            return response.status(400).json({
                ok: false,
                msg: 'Invalid credentials.'
            })
        }

        // Generar mi JWT
        const token = await generateJWT(userDB._id)

        response.json({
            ok: true,
            user: userDB,
            token
        })

    } catch (error) {
        console.log(`❌  An error occurred: ${error}.`)
        response.status(500).json({
            ok: false,
            msg: 'Unexpected error occurred. Please try again.'
        })
    }
}

const renewToken = async(request, response) => {
    const { uid } = request.body

    try {
        const userDB = await User.findOne({ id: uid })

        if (!userDB) {
            return response.status(404).json({
                ok: false,
                msg: 'The email is not valid. Please try again with a valid email.'
            })
        }

        // Generate the JWT
        const token = await generateJWT(userDB._id)

        response.json({
            ok: true,
            user: userDB,
            token
        })


    } catch (error) {
        console.log(`❌  An error occurred: ${error}.`)
        response.status(500).json({
            ok: false,
            msg: 'Unexpected error occurred. Please try again.'
        })
    }
}

module.exports = { signUp, signIn, renewToken }