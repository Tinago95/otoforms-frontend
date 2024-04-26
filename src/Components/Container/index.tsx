import * as React from "react"
import { styled, Theme, CSSObject } from "@mui/material/styles"
import Box from "@mui/material/Box"
import MuiDrawer from "@mui/material/Drawer"
import { NavItemProps, NavList } from "../CollapsibleMenu"
import List from "@mui/material/List"
import IconButton from "@mui/material/IconButton"
import * as icons from "@mui/icons-material"
import { useLocation, useNavigate } from "react-router-dom"
import Logo from "../../logo.png"
import LogoIcon from "../../logo-icon.png"
import { Avatar } from "@mui/material"
import * as nanoid from "nanoid"
import * as AIcons from "react-icons/ai"
import * as Im from "react-icons/im"
import { ReactNode } from "react"

interface ParentComProps {
  children?: ReactNode
}
const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerToggle = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  backgroundColor: "whitesmoke",
  top: "18px",
  zIndex: 100000000,
  borderRadius: "50%",
  width: "20px",
  height: "20px",
  transition: "all 225ms cubic-bezier(0.4, 0, 0.6, 1) 0ms",
}))
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}))



const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  width: drawerWidth,
  border: "none",

  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}))

const Container: React.FC<ParentComProps> = (props) => {
  // const { user, signOut } = useAuthenticator((context) => [context.user])
  const randomUUID = nanoid.customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 18)
  const navigate = useNavigate()
  const { children } = props
  const [open, setOpen] = React.useState(false)
  // const idTokenPayload = user.getSignInUserSession()?.getIdToken().decodePayload();
  // const groups: string[] = idTokenPayload?.["cognito:groups"] || []
  const [isAdmin] = React.useState(() => {
    // if (groups.includes('administrator')) return true;
    // else return false;
    return true
  })

  const toggleDrawer = () => {
    setOpen(!open)
  }
  const Logout = async () => {
    // signOut()
  }
  const location = useLocation()

  const navList: NavItemProps[] = [
    {
      label: "Home",
      icon: AIcons.AiOutlineHome,
      color: "white",
      link: "/home",
      show: true,
      parent: true,
      children: [] as NavItemProps[]
    },
    {
      label: "Form Builder",
      icon: icons.Construction,
      color: "white",
      link: "/form-builder",
      show: isAdmin,
      parent: true,
      children: [] as NavItemProps[]

    },
   
  ]
  React.useEffect(() => { }, [open, location])
  return (
    <Box sx={{ display: "flex" }}>
      {(
        <DrawerToggle style={{ backgroundColor: 'whitesmoke' }} onClick={toggleDrawer} sx={{ top: '60px', left: !open ? "60px" : "230px" }}>
          {!open && <icons.ChevronLeft style={{ fontSize: "20px", color: "black" }} />}

          {open && <icons.ChevronRight style={{ fontSize: "20px", color: "black" }} />}
        </DrawerToggle>
      )}
      <Drawer
        PaperProps={{
          sx: {
            backgroundColor: "#2A324B",
            display: "flex",
            justifyContent: "space-between",
          },
        }}
        color="primary"
        variant="permanent"
        open={open}
        sx={{
          display: "flex",

          justifyContent: "space-between",
          "& .MuiDrawer-paper": { borderWidth: 0.25 },
        }}
      >
        <Box>
          <DrawerHeader style={{ display: "flex", justifyContent: "flex-start" }}>
            <div>{open ? <img style={{ width: "160px", marginTop: "10px", marginLeft: "18px" }} src={Logo} /> : <img style={{ width: "50px", marginTop: "10px", }} src={LogoIcon} />}</div>
            <IconButton sx={{ marginLeft: "5px" }} onClick={toggleDrawer}>
              {true ? undefined : <icons.Menu />}
            </IconButton>
          </DrawerHeader>
          <List >
            <NavList navItems={navList} />
          </List>
        </Box>
        <Box style={{ padding: "30px" }}>
          {open && <Box
            style={{
              justifyContent: "space-between",
              padding: "3px",
              display: "flex",
              flexDirection: "row",
              backgroundColor: "whitesmoke",
              borderRadius: "10px",
            }}
          >
            <Avatar style={{ backgroundColor: "whitesmoke", color: "gray" }}>
              <icons.Face6Outlined />{" "}
            </Avatar>
            <IconButton>
              <icons.Settings />{" "}
            </IconButton>
            <IconButton onClick={Logout}>
              <Im.ImExit color="secondary" />{" "}
            </IconButton>
          </Box>}
          {!open &&
            < Avatar style={{ backgroundColor: "whitesmoke", color: "gray", top: '5px', right: '20px' }}>
              <icons.Face6Outlined />{" "}
            </Avatar>


          }
        </Box>
      </Drawer >
      <div style={{ display: "flex", flexShrink: 1, width: "calc(100vw - 65px)" }}>
        <Box
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "row",
            flexGrow: 1,
            flexShrink: 1,
            color: "white",
            fontSize: "20px",
            padding: "20px",
            height: "calc( 100vh - 40px)",
            bottom: "0px",
            right: "0px",
          }}
        >
          {children}
        </Box>
      </div>
    </Box >
  )
}
export default Container
