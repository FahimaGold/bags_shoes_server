import { Router, Request, Response } from 'express';

import { User } from '../models/User';
import {config} from '../../../../config/config';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { NextFunction } from 'connect';
import * as EmailValidator from 'email-validator';


const router: Router = Router();


async function generatePassword(plainTextPassword: string): Promise<string> {
    //Generating Salted Hashed Passwords
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(plainTextPassword, salt);

    return hash;
}

async function comparePasswords(plainTextPassword: string, hash: string): Promise<boolean> {
    const compare = await bcrypt.compare(plainTextPassword, hash);
    return compare;
}

function generateJWT(user: User): string {
    return jwt.sign(user.toJSON(), config.jwt.secret);
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
    if(!req.headers  || !req.headers.authorization){
        return res.status(401).send({message:'No authorization headers.'});
    }

    const token_bearer = req.headers.authorization.split(' ');
    if(token_bearer.length != 2){
        return res.status(401).send({message:'Malformed token'});
    }

    const token  = token_bearer[1];

    return jwt.verify(token, config.jwt.secret, (err, decoded)=>{
        if(err){
            return res.status(500).send({auth:false, message:'Failed to authenticate'});
        }
       return next();
    })
    
}

router.get('/verification', 
    requireAuth, 
    async (req: Request, res: Response) => {
        return res.status(200).send({ auth: true, message: 'Authenticated.' });
});

router.post('/login', async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;
    // check email is valid
    if (!email || !EmailValidator.validate(email)) {
        return res.status(400).send({ auth: false, message: 'Email is required or malformed' });
    }

    // check email password valid
    if (!password) {
        return res.status(400).send({ auth: false, message: 'Password is required' });
    }

    const user = await User.findByPk(email);
    // check that user exists
    if(!user) {
        return res.status(401).send({ auth: false, message: 'Unauthorized' });
    }

    // check that the password matches
    const authValid = await comparePasswords(password, user.password_hash)

    if(!authValid) {
        return res.status(401).send({ token: false, message: 'Unauthorized' });
    }

    // Generate JWT
    const jwt = generateJWT(user);

    res.status(200).send({ auth: true, token: jwt, user: user.short()});
    //res.status(401).send({ token: false, message: 'Unauthorized' });
});

//register a new user
router.post('/', async (req: Request, res: Response) => {
    let {email, firstname, surname, number, password} = req.body;
    //const email = req.body.email;
   // const plainTextPassword = req.body.password;
    //console.log('Email ' + email);
    // check email is valid
    
    if (!email.trim() || !EmailValidator.validate(email.trim())) {
        return res.status(400).send({ token: "", error: "Email is required or malformed" });
    }
    console.log('pwd ' + password);
    // check email password valid
    if (!password) {
        return res.status(400).send({ token: "", error: "Password is required" });
    }

    // Checking if user already exists
    const user = await User.findByPk(email.trim());
    // check that user doesnt exists
    if(user) {
        return res.status(422).send({ token: "", error: "User may already exist" });
    }

    const password_hash = await generatePassword(password.trim());

    const newUser = await new User({
        email: email.trim(),
        firstname: firstname,
        surname: surname,
        number: number,
        password_hash: password_hash
    });

    let savedUser;
    try {
        savedUser = await newUser.save();
    } catch (e) {
        throw e;
    }

    // Generate JWT
    const jwt = generateJWT(savedUser);
    console.log("TOKEN " + jwt);
    res.status(201).send({token: jwt, error: ""});
});

router.get('/', async (req: Request, res: Response) => {
    res.send('Auth')
});

export const AuthRouter: Router = router;