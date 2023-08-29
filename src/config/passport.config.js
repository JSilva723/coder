import 'dotenv/config'
import passport from 'passport'
import GitHubStrategy from 'passport-github2'
import { SessionManager } from '../dao/dbManager/session.manager.js'

const sessionManager = SessionManager.getInstance()

export const initializePassport = () => {
    passport.use('github', new GitHubStrategy({
        clientID: process.env.GH_CLIENT_ID,
        clientSecret: process.env.GH_CLIENT_SECRET,
        callbackURL: 'http://localhost:8080/api/session/gcb'
    }, async (accessToken, refresToken, profile, done) => {
        const email = profile._json.login.toLowerCase() + '@gitgub.com'
        try {
            const user = await sessionManager.getUser({ email, password: '' })
            done(null, user)
        } catch (error) {
            if (error.message === 'User not exist') {
                const newUser = await sessionManager.addUser({
                    first_name: profile._json.name,
                    last_name: 'lastName',
                    age: 18,
                    email,
                    password: ''
                })
                return done(null, newUser)
            }
            return done(error, null)
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = sessionManager.getUserById(id)
        done(null, user)
    })
}
