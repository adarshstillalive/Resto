import {
  Button,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
  Box,
  Alert,
  Snackbar,
} from "@mui/material";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import { IRestaurant } from "./interface/IRestaurant";
import {
  addRestaurantApi,
  deleteRestaurantApi,
  editRestaurantApi,
  fetchRestaurantsApi,
} from "./services/crudService";
import { Add } from "@mui/icons-material";
import AddRestaurantForm from "./components/AddRestaurantForm";
import EditRestaurantForm from "./components/EditRestaurantForm";
import RestaurantCard from "./components/RestaurantCard";

function App() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<"success" | "error">("success");
  const [toggle, setToggle] = useState(false);
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [openAddForm, setOpenAddForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [editingRestaurant, setEditingRestaurant] =
    useState<IRestaurant | null>(null);

  const theme = createTheme({
    palette: {
      mode: toggle ? "dark" : "light",
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#000000",
      },
    },
  });

  const toggleMode = () => setToggle((prev) => !prev);

  const fetchRestaurants = async () => {
    try {
      const response = await fetchRestaurantsApi();
      setRestaurants(response.data);
    } catch (error) {
      console.error("Failed to fetch restaurants", error);
    }
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const handleAddRestaurant = async (restaurantData: IRestaurant) => {
    try {
      await addRestaurantApi(restaurantData);
      setOpenAddForm(false);
      fetchRestaurants();
      setMessage("Restaurant data added");
      setSeverity("success");
      setOpen(true);
    } catch (error) {
      console.error("Failed to save restaurant", error);
      setMessage("Adding restaurant data failed");
      setSeverity("error");
      setOpen(true);
    }
  };

  const handleEditRestaurant = async (restaurantData: IRestaurant) => {
    try {
      if (!editingRestaurant?.restoId) return;
      await editRestaurantApi(editingRestaurant.restoId, restaurantData);
      setOpenEditForm(false);
      setEditingRestaurant(null);
      fetchRestaurants();
      setMessage("Restaurant data updated");
      setSeverity("success");
      setOpen(true);
    } catch (error) {
      console.error("Failed to save restaurant", error);
      setMessage("Error in updating restaurant data");
      setSeverity("error");
      setOpen(true);
    }
  };

  const handleDelete = async (restoId: string) => {
    try {
      await deleteRestaurantApi(restoId);
      fetchRestaurants();
      setMessage("Restaurant deleted successfully");
      setSeverity("success");
      setOpen(true);
    } catch (error) {
      console.error("Failed to delete restaurant", error);
      setMessage("Error in deleting restaurant data");
      setSeverity("error");
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={toggle} toggleDarkMode={toggleMode} />

      <Container maxWidth="lg" sx={{ textAlign: "center", py: 5 }}>
        <Typography variant="h2" fontWeight="bold">
          Discover Amazing Restaurants 🍽️
        </Typography>
        <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
          Browse, add, and manage restaurants effortlessly.
        </Typography>
      </Container>

      <Button
        variant="contained"
        color="primary"
        startIcon={<Add />}
        sx={{
          position: "fixed",
          top: 100,
          right: 20,
          borderRadius: "50px",
          padding: "10px 20px",
        }}
        onClick={() => setOpenAddForm(true)}
      >
        Add Restaurant
      </Button>

      <Container sx={{ py: 5 }}>
        <Typography variant="h4" gutterBottom>
          Restaurants List
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
              lg: "repeat(4, 1fr)",
            },
            gap: 3,
          }}
        >
          {restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.restoId}
              restaurant={restaurant}
              setEditingRestaurant={setEditingRestaurant}
              setOpenEditForm={setOpenEditForm}
              handleDelete={handleDelete}
            />
          ))}
        </Box>
      </Container>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={severity}>
          {message}
        </Alert>
      </Snackbar>

      <AddRestaurantForm
        open={openAddForm}
        onClose={() => setOpenAddForm(false)}
        onSubmit={handleAddRestaurant}
      />

      <EditRestaurantForm
        open={openEditForm}
        onClose={() => {
          setOpenEditForm(false);
          setEditingRestaurant(null);
        }}
        onSubmit={handleEditRestaurant}
        defaultValues={editingRestaurant}
      />
    </ThemeProvider>
  );
}

export default App;
