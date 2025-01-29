import {
  Button,
  Container,
  createTheme,
  CssBaseline,
  ThemeProvider,
  Typography,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Box,
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
import { Add, Delete, Edit } from "@mui/icons-material";
import AddRestaurantForm from "./components/AddRestaurantForm";
import EditRestaurantForm from "./components/EditRestaurantForm";

function App() {
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
    } catch (error) {
      console.error("Failed to save restaurant", error);
    }
  };

  const handleEditRestaurant = async (restaurantData: IRestaurant) => {
    try {
      if (!editingRestaurant?.restoId) return;
      await editRestaurantApi(editingRestaurant.restoId, restaurantData);
      setOpenEditForm(false);
      setEditingRestaurant(null);
      fetchRestaurants();
    } catch (error) {
      console.error("Failed to save restaurant", error);
    }
  };

  const handleDelete = async (restoId: string) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await deleteRestaurantApi(restoId);
      fetchRestaurants();
    } catch (error) {
      console.error("Failed to delete restaurant", error);
    }
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
            <Card
              key={restaurant.restoId}
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: (theme) => theme.shadows[8],
                },
                borderRadius: 2,
                overflow: "hidden",
              }}
            >
              <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {restaurant.name}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 1,
                  }}
                >
                  📍 {restaurant.address}
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  📞 {restaurant.contact}
                </Typography>
              </CardContent>
              <CardActions
                sx={{
                  justifyContent: "flex-end",
                  p: 2,
                  borderTop: 1,
                  borderColor: "divider",
                }}
              >
                <IconButton
                  color="primary"
                  size="small"
                  onClick={() => {
                    setEditingRestaurant(restaurant);
                    setOpenEditForm(true);
                  }}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  color="error"
                  size="small"
                  onClick={() =>
                    restaurant.restoId && handleDelete(restaurant.restoId)
                  }
                >
                  <Delete />
                </IconButton>
              </CardActions>
            </Card>
          ))}
        </Box>
      </Container>

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
