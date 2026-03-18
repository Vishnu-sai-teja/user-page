import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import NavigationBar from 'carbon-react/lib/components/navigation-bar'
import Box from 'carbon-react/lib/components/box'
import Typography from 'carbon-react/lib/components/typography'
import styled from 'styled-components'

const NAV_ITEMS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Experience', path: '/experience' },
  { label: 'Projects', path: '/projects' },
  { label: 'Recommendations', path: '/recommendations' },
  { label: 'Contact', path: '/contact' },
]

const NavLink = styled.a<{ $active: boolean }>`
  display: inline-block;
  padding: 0 16px;
  height: 40px;
  line-height: 40px;
  text-decoration: none;
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? '700' : '400')};
  color: ${({ $active }) => ($active ? 'var(--colorsActionMajor500, #003349)' : 'var(--colorsUtilityYin090, #333)')};
  border-bottom: ${({ $active }) => ($active ? '2px solid var(--colorsActionMajor500, #003349)' : '2px solid transparent')};
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.15s, border-color 0.15s;

  &:hover {
    color: var(--colorsActionMajor500, #003349);
    border-bottom-color: var(--colorsActionMajor300, #004B87);
  }

  &:focus-visible {
    outline: 2px solid var(--colorsActionMajor500, #003349);
    outline-offset: 2px;
  }
`

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  font-size: 20px;
  color: var(--colorsUtilityYin090, #333);

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const DesktopLinks = styled.nav`
  display: flex;
  align-items: center;
  gap: 0;

  @media (max-width: 768px) {
    display: none;
  }
`

const MobileMenu = styled.nav<{ $open: boolean }>`
  display: none;
  position: fixed;
  top: 40px;
  left: 0;
  right: 0;
  background: white;
  border-top: 1px solid #e0e0e0;
  z-index: 999;
  flex-direction: column;
  padding: 8px 0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);

  @media (max-width: 768px) {
    display: ${({ $open }) => ($open ? 'flex' : 'none')};
  }
`

const MobileNavLink = styled.a<{ $active: boolean }>`
  display: block;
  padding: 12px 24px;
  text-decoration: none;
  font-size: 15px;
  font-weight: ${({ $active }) => ($active ? '700' : '400')};
  color: ${({ $active }) => ($active ? 'var(--colorsActionMajor500, #003349)' : 'var(--colorsUtilityYin090, #333)')};
  background: ${({ $active }) => ($active ? 'rgba(0,51,73,0.05)' : 'transparent')};

  &:hover {
    background: rgba(0,51,73,0.05);
  }
`

interface AppShellProps {
  children: React.ReactNode
}

function AppShell({ children }: AppShellProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleNavClick = (path: string, e: React.MouseEvent) => {
    e.preventDefault()
    setMobileOpen(false)
    navigate(path)
  }

  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <NavigationBar
        position="sticky"
        navigationType="white"
        aria-label="Main navigation"
        paddingX={3}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width="100%"
          maxWidth="1280px"
          mx="auto"
          height="40px"
        >
          <a
            href="/"
            onClick={(e: React.MouseEvent) => handleNavClick('/', e)}
            style={{ textDecoration: 'none', color: 'var(--colorsUtilityYin090, #333)', cursor: 'pointer', fontSize: '15px', fontWeight: 700 }}
          >
            Vishnu Nagabandi
          </a>

          <DesktopLinks aria-label="Site navigation">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.path}
                href={item.path}
                $active={location.pathname === item.path}
                onClick={(e) => handleNavClick(item.path, e)}
                aria-current={location.pathname === item.path ? 'page' : undefined}
              >
                {item.label}
              </NavLink>
            ))}
          </DesktopLinks>

          <MobileMenuButton
            data-testid="mobile-menu-btn"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? '✕' : '☰'}
          </MobileMenuButton>
        </Box>
      </NavigationBar>

      <MobileMenu $open={mobileOpen} aria-label="Mobile navigation">
        {NAV_ITEMS.map((item) => (
          <MobileNavLink
            key={item.path}
            href={item.path}
            $active={location.pathname === item.path}
            onClick={(e) => handleNavClick(item.path, e)}
            aria-current={location.pathname === item.path ? 'page' : undefined}
          >
            {item.label}
          </MobileNavLink>
        ))}
      </MobileMenu>

      <Box as="main" flex="1" width="100%">
        {children}
      </Box>

      <footer style={{ padding: '12px 24px', borderTop: '1px solid #e0e0e0', backgroundColor: '#f9f9f9' }}>
        <Box maxWidth="1280px" mx="auto">
          <Typography variant="small" color="blackOpacity55">
            © {new Date().getFullYear()} Vishnu Sai Teja Nagabandi · Built with Carbon Design System
          </Typography>
        </Box>
      </footer>
    </Box>
  )
}

export default AppShell
