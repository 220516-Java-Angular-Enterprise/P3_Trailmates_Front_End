export interface Trail{
  id?: string;
  trail_id?: Trail;
  name?: string;
  park_name?: string;
  image_url?: string;
  website_url?: string;
  is_reservation_required?: boolean;
  are_pets_permitted?: boolean;
  do_fees_apply?: boolean;
  long_desc?: string;
  short_desc?: string;
  location?: string;
  duration?: string;
  parkCode?: string;
  latitude?: string;
  longitude?: string;
}