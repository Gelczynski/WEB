import { Link } from "react-router-dom";

// Hooks
import { useEffect, useState } from "react";

// MUI
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Link as MuiLink,
  Grid,
  FormGroup,
  Checkbox,
  FormControlLabel,
} from "@mui/material";

const ShopCard = ({ shop, params }) => {
  const { name, address, flavors, _id } = shop;
  const { country, city, postCode, streetName, streetNumber } = address;
  const { showFlavors, query } = params;

  const [filteredFlavors, setFilteredFlavors] = useState([]);

  useEffect(() => {
    let ignore = false;
    if (query === "") {
      if (!ignore) setFilteredFlavors([]);
    } else {
      if (!ignore) {
        setFilteredFlavors(
          flavors.filter((flavor) => {
            if (flavor.name.toLowerCase().includes(query.toLowerCase()))
              return flavor;
            return null;
          })
        );
      }
    }

    return () => (ignore = true);
  }, [query]);

  return (
    <Card className="shop-card" elevation={0}>
      <CardHeader title={name} />
      <CardContent color="secondary">
        <Typography type="h5">
          {country} {city} {postCode} {streetName} {streetNumber}
        </Typography>
        <Typography>
          <MuiLink component={Link} color="text.primary" to={`/shop/${_id}`}>
            Pokaż szczegóły
          </MuiLink>
        </Typography>
        {showFlavors && (
          <>
            <Typography>Lista smaków</Typography>
            <Grid container>
              {filteredFlavors.map((flavor, i) => (
                <Grid xs={12} key={i} item>
                  <FormGroup>
                    <FormControlLabel
                      disabled
                      control={<Checkbox defaultChecked={flavor.available} />}
                      label={flavor.name}
                    />
                  </FormGroup>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ShopCard;
