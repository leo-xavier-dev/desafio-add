import { Thumbnail } from './thumbnail';

export interface Comics {
  id :number;
  title :string;
  description :string;
  modified :Date;
  resourceURI :string;
  urls :object;
  thumbnail :Thumbnail;
// comics :ComicList;
// stories :StoryList;
// events :EventList;
//     series (SeriesList, optional): A resource list of series in which this character appears.
}
