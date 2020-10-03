export interface Character {
  id :number;
  name: string;
  description :string;
  modified :Date;
  resourceURI :string;
  urls :object;
  thumbnail :string;
// comics :ComicList;
// stories :StoryList;
// events :EventList;
//     series (SeriesList, optional): A resource list of series in which this character appears.
}
