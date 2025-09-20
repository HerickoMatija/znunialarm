'use client'

import { useUserContext } from '@/components/yum-components/auth/UserDataWrapper'
import { COOKIES } from '@/lib/Constants'
import { Authenticator, translations, useAuthenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import { I18n } from 'aws-amplify/utils'
import { getCookie } from 'cookies-next/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

I18n.putVocabularies(translations)
I18n.putVocabulariesForLanguage('sl', {
  'Sign in': 'Vpis',
  'Sign in to your account': 'Dobrodošli nazaj!',
  'Forgot your password?': 'Ste pozabili geslo?',
  'Enter your Email': 'Vnesite svoj email',
  'Enter your Username': 'Vnesite svoje uporabniško ime',
  'Enter your username': 'Vnesite svoje uporabniško ime',
  'Enter your email': 'Vnesite svoj email',
  'Enter your Password': 'Vnesite svoje geslo',
  'Enter your password': 'Vnesite svoje geslo',
  'Code *': 'Koda *',
  Code: 'Koda',
  Email: 'Email',
  Password: 'Geslo',
  Username: 'Uporabniško ime',
  Confirm: 'Potrdi',
  'Confirm Password': 'Potrdi geslo',
  'Back to Sign In': 'Nazaj na prijavo',
  'Please confirm your Password': 'Prosim potrdite vaše geslo',
  'Show password': 'Prikaži geslo',
  'Hide password': 'Skrij geslo',
  'Change Password': 'Spremeni geslo',
  'Reset your password': 'Spremeni geslo',
  'Reset your Password': 'Spremeni geslo',
  'Reset password': 'Spremeni geslo',
  'Reset Password': 'Spremeni geslo',
  'Send code': 'Pošlji kodo',
  'Send Code': 'Pošlji kodo',
  'User password cannot be reset in the current state.': 'Sprememba gesla ni mogoča! Kontaktirajte podporo',
  'Password must have at least 8 characters': 'Dolžina gesla mora biti vsaj 8 znakov',
  'Your passwords must match': 'Gesli se morata ujemati',
  'New password': 'Novo geslo',
  'New Password': 'Novo geslo',
  Submit: 'Potrdi',
  'Resend Code': 'Ponovno pošlji kodo',
  'Attempt limit exceeded, please try after some time.': 'Preveč poskusov, poskusite ponovno čez nekaj časa.',
  'Invalid verification code provided, please try again.': 'Neveljavna koda, poskusite ponovno',
  'Signing in': 'Vpisovanje',
  'User does not exist.': 'Uporabnik ne obstaja.',
  'Incorrect username or password.': 'Neveljavno geslo ali uporabnik.',
})
I18n.putVocabulariesForLanguage('de', {
  'Reset your password': 'Passwort zurücksetzen',
  'Reset your Password': 'Passwort zurücksetzen',
  'Reset password': 'Passwort zurücksetzen',
  'Reset Password': 'Passwort zurücksetzen',
  'Send code': 'Code senden',
  'Send Code': 'Code senden',
  'Enter your Email': 'Geben Sie Ihre E-Mail Adresse ein',
  'Enter your email': 'Geben Sie Ihre E-Mail Adresse ein',
  'Enter your Username': 'Geben Sie Ihre Benutzername ein',
  'Attempt limit exceeded, please try after some time.':
    'Versuchsbeschränkung überschritten, bitte versuchen Sie es später erneut.',
  'User does not exist.': 'Benutzer existiert nicht.',
  'Your passwords must match': 'Ihre Passwörter müssen übereinstimmen',
  'Password must have at least 8 characters': 'Passwort muss mindestens 8 Zeichen haben.',
  'Invalid verification code provided, please try again.':
    'Ungültiger Bestätigungscode eingegeben, bitte versuchen Sie es erneut.',
  'Incorrect username or password.': 'Falscher Benutzername oder falsches Passwort.',
})

export default function LoginComponent({ origin }: { origin: string }) {
  const [key, setKey] = useState(1)
  const { refreshUser } = useUserContext()
  const { route } = useAuthenticator((context) => [context.route])
  const router = useRouter()
  const locale = getCookie(COOKIES.LANGUAGE) || 'en'

  useEffect(() => {
    if (route === 'authenticated') {
      refreshUser()
      router.push(origin || '/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route, router])

  useEffect(() => {
    I18n.setLanguage(locale)
    setKey(key * -1)
    router.refresh()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  return <Authenticator hideSignUp={true} />
}
