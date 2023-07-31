import { User } from 'src/users/typeorm/users.entity';
import { Movies } from './Movies';
import { MovieSchedules } from './MovieSchedules';
import { MovieTags } from './MovieTags';
import { OrderItems } from './OrderItems';
import { Orders } from './Orders';
import { Studios } from './Studios';
import { Tags } from './Tags';

const entities = [Movies, User, MovieSchedules, MovieTags, OrderItems, Orders, Studios, Tags];

export { entities };
