import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { useUser } from "../context/UserContext";

const ProfileView = () => {
  return (
    <Card className="card">
      <CardHeader
        className="card-header"
        title={<Typography variant="h5">Przeglądaj profil</Typography>}
      />
      <CardContent className="card-content">
        jestem konentent przgladaj
      </CardContent>
    </Card>
  );
};

export default ProfileView;
