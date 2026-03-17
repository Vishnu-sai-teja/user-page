import { expect, test } from '@playwright/test'

test.describe('smoke — application boot', () => {
  test('home page loads without runtime failure and shows the hero', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Vishnu Nagabandi/)
    await expect(page.getByRole('heading', { name: /Vishnu Sai Teja Nagabandi/i })).toBeVisible()
    await expect(page.getByText(/I build grounded AI systems/i)).toBeVisible()
  })
})

test.describe('smoke — navigation', () => {
  test('about page renders the narrative heading', async ({ page }) => {
    await page.goto('/#/about')
    await expect(
      page.getByRole('heading', { name: /I like AI work that survives contact with reality/i }),
    ).toBeVisible()
  })

  test('projects page renders the projects heading', async ({ page }) => {
    await page.goto('/#/projects')
    await expect(
      page.getByRole('heading', { name: /Built work across agents/i }),
    ).toBeVisible()
  })

  test('notes page renders the notes heading', async ({ page }) => {
    await page.goto('/#/notes')
    await expect(
      page.getByRole('heading', { name: /Inputs, outputs, and references worth keeping nearby/i }),
    ).toBeVisible()
  })

  test('navigating via header links changes the active page', async ({ page }) => {
    await page.goto('/')
    await page.getByLabel('Primary navigation').getByRole('link', { name: /^about$/i }).click()
    await expect(
      page.getByRole('heading', { name: /I like AI work that survives contact with reality/i }),
    ).toBeVisible()
  })

  test('unknown hash route shows the 404 page with a way back home', async ({ page }) => {
    await page.goto('/#/nonexistent-route')
    await expect(
      page.getByRole('heading', { name: /That page does not exist here/i }),
    ).toBeVisible()
    await expect(page.getByRole('link', { name: /Return home/i })).toBeVisible()
  })
})

test.describe('smoke — projects interaction', () => {
  test('search filters the project grid', async ({ page }) => {
    await page.goto('/#/projects')
    const search = page.getByPlaceholder(/Search projects/i)
    await search.fill('GANs')
    await expect(page.getByRole('heading', { name: /Skin Cancer Detection/i })).toBeVisible()
    await expect(page.getByRole('heading', { name: /Staffusion/i })).not.toBeVisible()
  })

  test('empty search query shows the "no matching projects" empty state', async ({ page }) => {
    await page.goto('/#/projects')
    await page.getByPlaceholder(/Search projects/i).fill('xxxxnotfound')
    await expect(page.getByText(/No matching projects/i)).toBeVisible()
  })

  test('switching to table view shows the project index table', async ({ page }) => {
    await page.goto('/#/projects')
    await page.getByRole('tab', { name: /table/i }).click()
    await expect(page.getByRole('table', { name: /Project index/i })).toBeVisible()
  })
})

test.describe('smoke — about page accordion', () => {
  test('expanding an experience accordion reveals the role highlights', async ({ page }) => {
    await page.goto('/#/about')
    await page.getByRole('button', { name: /SAGE \| Graduate AI Engineer/i }).click()
    await expect(page.getByText(/Designed and productionized ReWOO-based agents/i)).toBeVisible()
  })
})

test.describe('smoke — external link security', () => {
  test('external links carry rel="noreferrer"', async ({ page }) => {
    await page.goto('/#/notes')
    await page.getByRole('tab', { name: /bookmarks/i }).click()
    // Every external link in the bookmarks table should carry rel="noreferrer"
    const firstExternalLink = page.locator('a[href^="http"]').first()
    await expect(firstExternalLink).toHaveAttribute('rel', 'noreferrer')
  })
})
