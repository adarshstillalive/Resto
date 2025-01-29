import { Edit, Delete } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { IRestaurant } from "../interface/IRestaurant";
import { useState } from "react";

interface RestaurantCardProps {
  restaurant: IRestaurant;
  setEditingRestaurant: (restaurant: IRestaurant) => void;
  setOpenEditForm: (val: boolean) => void;
  handleDelete: (restoId: string) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  setEditingRestaurant,
  setOpenEditForm,
  handleDelete,
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
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
          <IconButton color="error" size="small" onClick={handleClickOpen}>
            <Delete />
          </IconButton>
        </CardActions>
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action can't be undone
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            sx={{ bgcolor: "tomato", color: "white" }}
            onClick={() =>
              restaurant.restoId && handleDelete(restaurant.restoId)
            }
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default RestaurantCard;
