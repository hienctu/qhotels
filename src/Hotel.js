import React from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import CircleIcon from '@mui/icons-material/Circle';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import ShareIcon from '@mui/icons-material/Share';
import { Chip, Grid, Rating,
          Typography, IconButton, 
          Card, CardHeader, CardMedia, CardContent, CardActions } from '@mui/material';

export default ({ hotel }) => {
    const p = hotel.property;
    const o = hotel.offer;
    return (
      <Card sx={{ maxWidth: 350 }}>
        <CardHeader className="card-header"
          avatar={
            o.promotion && o.promotion.title && <Chip label={o.promotion.title} color="error" />
          }
          title={<a href="#" title={p.title}><Typography noWrap className="card-title">{p.title}</Typography></a>}
          subheader={p.address.join(', ')}
        />
        <CardMedia
          component="img"
          height="194"
          image={p.previewImage.url}
          alt={p.previewImage.caption}
          
        />
        <CardContent sx={{ minHeight: 150 }}>
          <Typography variant="h6" color="success.dark">
            <a href="#" title={o.name}>{o.name}</a>
          </Typography>
          
          <Grid container>
            <Grid item xs={7}>
              <Typography variant="caption">
                1 night total ({o.displayPrice.currency})
              </Typography>
              <Typography variant="h3" >
                ${o.displayPrice.amount}
              </Typography>
              {o && o.cancellationOption && o.cancellationOption.cancellationType === "FREE_CANCELLATION" && 
                <Typography variant="caption" color="primary.light">
                  Free cancellation
                </Typography>
              }
            </Grid>
            <Grid item xs={5}>
              {o.savings && o.savings.amount && <Typography variant="h6" color="error">
                Save ${o.savings.amount}
              </Typography>    
              }
            </Grid>
          </Grid>
        </CardContent>
        <CardActions disableSpacing>
          {p.rating && p.rating.ratingValue && p.rating.ratingType === "star" &&
                <Rating className="star-rating" value={p.rating.ratingValue} precision={0.5} readOnly />
          }
          {p.rating && p.rating.ratingValue && p.rating.ratingType === "self" &&
                <Rating className="circle-rating" icon={<CircleIcon fontSize="small" /> } 
                  value={p.rating.ratingValue} precision={0.5} 
                  emptyIcon={<CircleOutlinedIcon fontSize="small" /> }
                  readOnly />
          }
        <div style={{ width: "100%", textAlign: "right" }}>
          <IconButton aria-label="add to favorites" style={{ marginLeft: "auto"}}>
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share" style={{ marginLeft: "auto"}}>
            <ShareIcon />
          </IconButton>
        </div>
      </CardActions>
    </Card>
    );
}