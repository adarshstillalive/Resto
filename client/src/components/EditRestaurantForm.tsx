import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { IRestaurant } from "../interface/IRestaurant";

interface EditRestaurantFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (restaurant: IRestaurant) => void;
  defaultValues?: IRestaurant | null;
}

const EditRestaurantForm: React.FC<EditRestaurantFormProps> = ({
  open,
  onClose,
  onSubmit,
  defaultValues,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<IRestaurant>({
    mode: "onChange",
  });

  useEffect(() => {
    if (defaultValues) {
      reset(defaultValues);
    }
  }, [defaultValues, reset]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogTitle>Edit Restaurant</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            {...register("name", {
              required: "Restaurant name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters long",
              },
            })}
            fullWidth
            margin="dense"
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            label="Address"
            {...register("address", {
              required: "Address is required",
              minLength: {
                value: 5,
                message: "Address must be at least 5 characters long",
              },
            })}
            fullWidth
            margin="dense"
            error={!!errors.address}
            helperText={errors.address?.message}
          />
          <TextField
            label="Contact"
            {...register("contact", {
              required: "Contact number is required",
              pattern: {
                value: /^[0-9-+\s()]*$/,
                message: "Please enter a valid contact number",
              },
            })}
            fullWidth
            margin="dense"
            error={!!errors.contact}
            helperText={errors.contact?.message}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2.5, pt: 1 }}>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={!isValid}>
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditRestaurantForm;
