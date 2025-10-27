const crypto = require('crypto')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

// Get session secret from environment or use default
const SESSION_SECRET = process.env.SESSION_SECRET || 'sen-studio-super-secret-key-change-in-production-2024'

function hashPassword(password) {
  const hash = crypto.createHash('sha256')
  hash.update(password + SESSION_SECRET)
  return hash.digest('hex')
}

console.log('🔐 Admin Password Hash Generator')
console.log('================================\n')

rl.question('Enter the password you want to use for admin access: ', async (password) => {
  if (!password) {
    console.log('\n❌ Password cannot be empty')
    rl.close()
    return
  }
  
  const hash = await hashPassword(password)
  
  console.log('\n✅ Password hash generated successfully!\n')
  console.log('Add this to your .env.local file:')
  console.log('----------------------------------')
  console.log(`ADMIN_PASSWORD_HASH=${hash}`)
  console.log('----------------------------------\n')
  
  if (SESSION_SECRET === 'change-this-secret-in-production') {
    console.log('⚠️  WARNING: Using default SESSION_SECRET.')
    console.log('   Change SESSION_SECRET in .env.local for production!\n')
  }
  
  rl.close()
})