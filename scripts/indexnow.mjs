#!/usr/bin/env node
// Usage:
//   INDEXNOW_TRIGGER_SECRET=... npm run indexnow -- https://fabianphil.com/en/artwork/12 [more URLs]
//   INDEXNOW_TRIGGER_SECRET=... npm run indexnow -- --all
// Options: --dry-run, --allow-removed, --base https://fabianphil.com

const args = process.argv.slice(2)
let base = 'https://fabianphil.com'
let all = false
let dryRun = false
let allowRemoved = false
const urls = []

for (let i = 0; i < args.length; i++) {
  const arg = args[i]
  if (arg === '--all') all = true
  else if (arg === '--dry-run') dryRun = true
  else if (arg === '--allow-removed') allowRemoved = true
  else if (arg === '--base') base = args[++i]
  else if (arg.startsWith('--base=')) base = arg.slice('--base='.length)
  else if (arg.startsWith('--')) {
    console.error(`Unknown option: ${arg}`)
    process.exit(2)
  } else urls.push(arg)
}

const secret = process.env.INDEXNOW_TRIGGER_SECRET
if (!secret) {
  console.error('INDEXNOW_TRIGGER_SECRET is not set in the environment.')
  process.exit(2)
}
if (!base) {
  console.error('--base requires a value.')
  process.exit(2)
}
if (!all && urls.length === 0) {
  console.error('Provide one or more URLs, or --all.')
  process.exit(2)
}

const body = all ? { all: true } : { urls }
if (dryRun) body.dryRun = true
if (allowRemoved) body.allowRemoved = true

const endpoint = new URL('/api/indexnow', base).toString()

try {
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secret}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: JSON.stringify(body),
  })
  const text = await response.text()
  let data
  try {
    data = JSON.parse(text)
  } catch {
    data = { raw: text.slice(0, 500) }
  }
  console.log(`HTTP ${response.status}`)
  console.log(JSON.stringify(data, null, 2))
  process.exit(response.ok ? 0 : 1)
} catch (error) {
  console.error(`Request to ${endpoint} failed: ${error instanceof Error ? error.message : 'unknown error'}`)
  process.exit(1)
}
