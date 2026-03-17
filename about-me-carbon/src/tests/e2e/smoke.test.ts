import { expect, test } from '@playwright/test'

/**
 * Smoke tests for the About Me page.
 * Validates that the page boots, the hero and major sections render, navigation
 * works, and the contact section provides usable links — all without a JS error.
 */

test.describe('About Me smoke tests', () => {
  test('page loads with correct title and no unhandled JS errors', async ({ page }) => {
    const errors: string[] = []
    page.on('pageerror', (err) => errors.push(err.message))

    await page.goto('/')

    await expect(page).toHaveTitle(/Vishnu Sai Teja Nagabandi | About Me/i)
    expect(errors).toHaveLength(0)
  })

  test('hero section renders identity and thesis', async ({ page }) => {
    await page.goto('/')

    await expect(
      page.getByRole('heading', { name: /Vishnu Sai Teja Nagabandi/i }),
    ).toBeVisible()
    await expect(
      page.getByText(/Graduate AI Engineer at SAGE/i).first(),
    ).toBeVisible()
    await expect(
      page.getByText(/grounded AI systems across multi-agent workflows/i),
    ).toBeVisible()
  })

  test('primary navigation links are present and point to in-page anchors', async ({ page }) => {
    await page.goto('/')

    const nav = page.getByRole('navigation', { name: /Primary sections/i })
    await expect(nav).toBeVisible()

    for (const [label, href] of [
      ['Summary', '#summary'],
      ['Experience', '#experience'],
      ['Skills', '#skills'],
      ['Projects', '#projects'],
      ['Education', '#education'],
      ['Contact', '#contact'],
    ]) {
      await expect(nav.getByRole('link', { name: label })).toHaveAttribute('href', href)
    }
  })

  test('major content sections are visible on the page', async ({ page }) => {
    await page.goto('/')

    await expect(
      page.getByRole('heading', { name: /Background, interests, and current direction/i }),
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: /Production AI, document systems, and ML infrastructure/i }),
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: /Languages, frameworks, cloud, and libraries/i }),
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: /Representative work across agents, generation, and medical imaging/i }),
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: /Reach out if the work overlaps/i }),
    ).toBeVisible()
  })

  test('contact section exposes working email and social links', async ({ page }) => {
    await page.goto('/')

    await expect(
      page.getByRole('link', { name: /Email Vishnu/i }),
    ).toHaveAttribute('href', 'mailto:vishnusaiteja.3004@gmail.com')

    await expect(
      page.getByRole('link', { name: /^GitHub$/i }),
    ).toHaveAttribute('href', 'https://github.com/Vishnu-sai-teja')

    await expect(
      page.getByRole('link', { name: /^LinkedIn$/i }),
    ).toHaveAttribute('href', 'https://www.linkedin.com/in/vishnu-sai-teja-nag')
  })

  test('skip-to-main-content link is present for keyboard users', async ({ page }) => {
    await page.goto('/')

    const skipLink = page.getByRole('link', { name: /skip to main content/i })
    await expect(skipLink).toBeAttached()
    await expect(skipLink).toHaveAttribute('href', '#main-content')
  })
})
