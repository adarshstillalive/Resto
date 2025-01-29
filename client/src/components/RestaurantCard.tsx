import { Card, CardContent, Typography, IconButton, Box } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

interface RestaurantCardProps {
  restaurant: { id: number; name: string; address: string; contact: string };
  onEdit: () => void;
  onDelete: () => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  restaurant,
  onEdit,
  onDelete,
}) => {
  return (
    <Card sx={{ boxShadow: 2, borderRadius: 2, padding: 2, mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{restaurant.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          📍 {restaurant.address}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          📞 {restaurant.contact}
        </Typography>
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={onEdit}>
            <Edit />
          </IconButton>
          <IconButton onClick={onDelete}>
            <Delete color="error" />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;
