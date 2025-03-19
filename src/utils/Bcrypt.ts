import * as bcrypt from 'bcrypt'

export const HashPass = async (pwd: string) => {
    const saltOrRounds = 10;
    const pass = await bcrypt.hash(pwd, saltOrRounds)

   return pass
}