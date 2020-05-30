import _ from "lodash";
import {apiUrl} from "../config";
import httpService from "./httpService";
const apiEndpoint = apiUrl + "/apartments";

const apartmentsAsJson = [
    {"_id": "1",
        "floorNumber": 3,
        "numberOfRooms": 2,
        "squareFit": 52,
        "ownerName": "Dr Dre",
        "city": "תל אביב יפו",
        "street": "יונה הנביא",
        "streetNumber": 13,
        "apartmentNumber": 5,
        "Rating": 3.5,
        "listOfReviews": [
            {"_id": "1", "createDate":"2012-04-23T18:25:43.511Z", "userID": "1","uploaderName": "דנה ושגיא", "rentalPeroid": "2018-05-10 - 2019-05-10", "lastRent": 5000, "lastWaterBill": 500, "lastElectricityBill": 600, "lastPropertyTax": 100, "livingExperienceText": "had a blast!" , "recommendationsText": "rent this already!",
                "listOfMalfunctions": [
                    {"_id":"1", "type":"livingExperience", "Text": "החוויה בדירה הייתה נוראית", "photos": [{link: "https://www.kimhi.co.il/Uploads/2019/07/loft%20apartment12.jpg"},{link:"https://www.kimhi.co.il/Uploads/2019/07/loft%20apartment15.jpg"},{link:"https://www.kimhi.co.il/Uploads/2019/07/loft%20apartment10.jpg"}]},
                    {"_id":"2", "type":"recommendations", "Text": "אל תשכרו את הדירה בשום אופן", "photos": []},
                    {"_id":"3", "type":"water", "Text": "זרם זרזיפי במקלחת", "photos": [{link:"https://images.maariv.co.il/image/upload/f_auto,fl_lossy/t_MD_MainArticleFaceDetect/543910"},{link:"https://www.theyeshivaworld.com/wp-content/uploads/2016/10/water-1024x576.jpg"}]},
                    {"_id":"4", "type":"electricity", "Text": "חצי מהמתגים בבית לא מחוברים", "photos": [{link:"https://upload.wikimedia.org/wikipedia/commons/4/4b/Lightning3.jpg"},{link:"https://www.israeldefense.co.il/sites/default/files/styles/full_article_image/public/_Uploads/dbsArticles/bigstock-High-Power-Electricity-Poles-I-253610563_0.jpg?itok=2D_5R47k"}]},
                    {"_id":"5", "type":"construction", "Text": "סדקים בקיר", "photos": [{link:"https://assets.dmagstatic.com/wp-content/uploads/2018/12/dallas-construction-1024x683.jpg"}]}
                ],
                "ratingStatus": 5, "status":"active", contract:"Based 64 encoded image", "identificationCard":" Based 64 encoded image"
            },
            {"_id": "2", "createDate":"2012-04-23T18:25:43.511Z", "userID": "1","uploaderName": "דנה ושגיא", "rentalPeroid": "2018-05-10 - 2019-05-10", "lastRent": 5000, "lastWaterBill": 500, "lastElectricityBill": 600, "lastPropertyTax": 100, "livingExperienceText": "had a blast!" , "recommendationsText": "rent this already!",
                "listOfMalfunctions": [
                    {"_id":"1", "type":"livingExperience", "Text": "החוויה בדירה הייתה נוראית", "photos": [{link: "https://www.kimhi.co.il/Uploads/2019/07/loft%20apartment12.jpg"},{link:"https://www.kimhi.co.il/Uploads/2019/07/loft%20apartment15.jpg"},{link:"https://www.kimhi.co.il/Uploads/2019/07/loft%20apartment10.jpg"}]},
                    {"_id":"2", "type":"recommendations", "Text": "אל תשכרו את הדירה בשום אופן", "photos": []},
                    {"_id":"3", "type":"water", "Text": "זרם זרזיפי במקלחת", "photos": [{link:"https://images.maariv.co.il/image/upload/f_auto,fl_lossy/t_MD_MainArticleFaceDetect/543910"},{link:"https://www.theyeshivaworld.com/wp-content/uploads/2016/10/water-1024x576.jpg"}]},
                    {"_id":"4", "type":"electricity", "Text": "חצי מהמתגים בבית לא מחוברים", "photos": [{link:"https://upload.wikimedia.org/wikipedia/commons/4/4b/Lightning3.jpg"},{link:"https://www.israeldefense.co.il/sites/default/files/styles/full_article_image/public/_Uploads/dbsArticles/bigstock-High-Power-Electricity-Poles-I-253610563_0.jpg?itok=2D_5R47k"}]},
                    {"_id":"5", "type":"construction", "Text": "סדקים בקיר", "photos": [{link:"https://assets.dmagstatic.com/wp-content/uploads/2018/12/dallas-construction-1024x683.jpg"}]}
                ],
                "ratingStatus": 5, "status":"active", contract:"Based 64 encoded image", "identificationCard":" Based 64 encoded image"
            },
            {"_id": "3", "createDate":"2012-04-23T18:25:43.511Z", "userID": "1","uploaderName": "דנה ושגיא", "rentalPeroid": "2018-05-10 - 2019-05-10", "lastRent": 5000, "lastWaterBill": 500, "lastElectricityBill": 600, "lastPropertyTax": 100, "livingExperienceText": "had a blast!" , "recommendationsText": "rent this already!",
                "listOfMalfunctions": [
                    {"_id":"1", "type":"livingExperience", "Text": "החוויה בדירה הייתה נוראית", "photos": [{link: "https://www.kimhi.co.il/Uploads/2019/07/loft%20apartment12.jpg"},{link:"https://www.kimhi.co.il/Uploads/2019/07/loft%20apartment15.jpg"},{link:"https://www.kimhi.co.il/Uploads/2019/07/loft%20apartment10.jpg"}]},
                    {"_id":"2", "type":"recommendations", "Text": "אל תשכרו את הדירה בשום אופן", "photos": []},
                    {"_id":"3", "type":"water", "Text": "זרם זרזיפי במקלחת", "photos": [{link:"https://images.maariv.co.il/image/upload/f_auto,fl_lossy/t_MD_MainArticleFaceDetect/543910"},{link:"https://www.theyeshivaworld.com/wp-content/uploads/2016/10/water-1024x576.jpg"}]},
                    {"_id":"4", "type":"electricity", "Text": "חצי מהמתגים בבית לא מחוברים", "photos": [{link:"https://upload.wikimedia.org/wikipedia/commons/4/4b/Lightning3.jpg"},{link:"https://www.israeldefense.co.il/sites/default/files/styles/full_article_image/public/_Uploads/dbsArticles/bigstock-High-Power-Electricity-Poles-I-253610563_0.jpg?itok=2D_5R47k"}]},
                    {"_id":"5", "type":"construction", "Text": "סדקים בקיר", "photos": [{link:"https://assets.dmagstatic.com/wp-content/uploads/2018/12/dallas-construction-1024x683.jpg"}]}
                ],
                "ratingStatus": 5, "status":"active", contract:"Based 64 encoded image", "identificationCard":" Based 64 encoded image"
            },

        ],
        "photo": "Base64 encoded image 1"
    },
    {"_id": "2",
        "floorNumber": 3,
        "numberOfRooms": 2,
        "squareFit": 52,
        "ownerName": "Dr Dre",
        "city": "Los Angeles",
        "street": "יונה הנביא",
        "streetNumber": 13,
        "apartmentNumber": 5,
        "Rating": 3.5,
        "listOfReviews": [
            {"_id": "1", "createDate":"2012-04-23T18:25:43.511Z", "userID": "1","uploaderName": "דנה ושגיא", "rentalPeroid": "2018-05-10 - 2019-05-10", "lastRent": 5000, "lastWaterBill": 500, "lastElectricityBill": 600, "lastPropertyTax": 100, "livingExperienceText": "had a blast!" , "recommendationsText": "rent this already!",
                "listOfMalfunctions": [
                    {"_id":"1", "type":"livingExperience", "Text": "החוויה בדירה הייתה נוראית", "photos": [{link: "https://www.kimhi.co.il/Uploads/2019/07/loft%20apartment12.jpg"},{link:"https://www.kimhi.co.il/Uploads/2019/07/loft%20apartment15.jpg"},{link:"https://www.kimhi.co.il/Uploads/2019/07/loft%20apartment10.jpg"}]},
                    {"_id":"2", "type":"recommendations", "Text": "אל תשכרו את הדירה בשום אופן", "photos": []},
                    {"_id":"3", "type":"water", "Text": "זרם זרזיפי במקלחת", "photos": [{link:"https://images.maariv.co.il/image/upload/f_auto,fl_lossy/t_MD_MainArticleFaceDetect/543910"},{link:"https://www.theyeshivaworld.com/wp-content/uploads/2016/10/water-1024x576.jpg"}]},
                    {"_id":"4", "type":"electricity", "Text": "חצי מהמתגים בבית לא מחוברים", "photos": [{link:"https://upload.wikimedia.org/wikipedia/commons/4/4b/Lightning3.jpg"},{link:"https://www.israeldefense.co.il/sites/default/files/styles/full_article_image/public/_Uploads/dbsArticles/bigstock-High-Power-Electricity-Poles-I-253610563_0.jpg?itok=2D_5R47k"}]},
                    {"_id":"5", "type":"construction", "Text": "סדקים בקיר", "photos": [{link:"https://assets.dmagstatic.com/wp-content/uploads/2018/12/dallas-construction-1024x683.jpg"}]}
                ],
                "ratingStatus": 5, "status":"active", contract:"Based 64 encoded image", "identificationCard":" Based 64 encoded image"
            },
            {"_id": "2", "createDate":"2012-04-23T18:25:43.511Z", "userID": "1","uploaderName": "דנה ושגיא", "rentalPeroid": "2018-05-10 - 2019-05-10", "lastRent": 5000, "lastWaterBill": 500, "lastElectricityBill": 600, "lastPropertyTax": 100, "livingExperienceText": "had a blast!" , "recommendationsText": "rent this already!",
                "listOfMalfunctions": [
                    {"_id":"1", "type":"livingExperience", "Text": "החוויה בדירה הייתה נוראית", "photos": [{link: "https://www.kimhi.co.il/Uploads/2019/07/loft%20apartment12.jpg"},{link:"https://www.kimhi.co.il/Uploads/2019/07/loft%20apartment15.jpg"},{link:"https://www.kimhi.co.il/Uploads/2019/07/loft%20apartment10.jpg"}]},
                    {"_id":"2", "type":"recommendations", "Text": "אל תשכרו את הדירה בשום אופן", "photos": []},
                    {"_id":"3", "type":"water", "Text": "זרם זרזיפי במקלחת", "photos": [{link:"https://images.maariv.co.il/image/upload/f_auto,fl_lossy/t_MD_MainArticleFaceDetect/543910"},{link:"https://www.theyeshivaworld.com/wp-content/uploads/2016/10/water-1024x576.jpg"}]},
                    {"_id":"4", "type":"electricity", "Text": "חצי מהמתגים בבית לא מחוברים", "photos": [{link:"https://upload.wikimedia.org/wikipedia/commons/4/4b/Lightning3.jpg"},{link:"https://www.israeldefense.co.il/sites/default/files/styles/full_article_image/public/_Uploads/dbsArticles/bigstock-High-Power-Electricity-Poles-I-253610563_0.jpg?itok=2D_5R47k"}]},
                    {"_id":"5", "type":"construction", "Text": "סדקים בקיר", "photos": [{link:"https://assets.dmagstatic.com/wp-content/uploads/2018/12/dallas-construction-1024x683.jpg"}]}
                ],
                "ratingStatus": 5, "status":"active", contract:"Based 64 encoded image", "identificationCard":" Based 64 encoded image"
            },
            {"_id": "3", "createDate":"2012-04-23T18:25:43.511Z", "userID": "1","uploaderName": "דנה ושגיא", "rentalPeroid": "2018-05-10 - 2019-05-10", "lastRent": 5000, "lastWaterBill": 500, "lastElectricityBill": 600, "lastPropertyTax": 100, "livingExperienceText": "had a blast!" , "recommendationsText": "rent this already!",
                "listOfMalfunctions": [
                    {"_id":"1", "type":"livingExperience", "Text": "החוויה בדירה הייתה נוראית", "photos": [{link: "https://www.kimhi.co.il/Uploads/2019/07/loft%20apartment12.jpg"},{link:"https://www.kimhi.co.il/Uploads/2019/07/loft%20apartment15.jpg"},{link:"https://www.kimhi.co.il/Uploads/2019/07/loft%20apartment10.jpg"}]},
                    {"_id":"2", "type":"recommendations", "Text": "אל תשכרו את הדירה בשום אופן", "photos": []},
                    {"_id":"3", "type":"water", "Text": "זרם זרזיפי במקלחת", "photos": [{link:"https://images.maariv.co.il/image/upload/f_auto,fl_lossy/t_MD_MainArticleFaceDetect/543910"},{link:"https://www.theyeshivaworld.com/wp-content/uploads/2016/10/water-1024x576.jpg"}]},
                    {"_id":"4", "type":"electricity", "Text": "חצי מהמתגים בבית לא מחוברים", "photos": [{link:"https://upload.wikimedia.org/wikipedia/commons/4/4b/Lightning3.jpg"},{link:"https://www.israeldefense.co.il/sites/default/files/styles/full_article_image/public/_Uploads/dbsArticles/bigstock-High-Power-Electricity-Poles-I-253610563_0.jpg?itok=2D_5R47k"}]},
                    {"_id":"5", "type":"construction", "Text": "סדקים בקיר", "photos": [{link:"https://assets.dmagstatic.com/wp-content/uploads/2018/12/dallas-construction-1024x683.jpg"}]}
                ],
                "ratingStatus": 5, "status":"active", contract:"Based 64 encoded image", "identificationCard":" Based 64 encoded image"
            },
        ],
        "photo": "Base64 encoded image 1"
    },
    {"_id": "3",
        "floorNumber": 3,
        "numberOfRooms": 2,
        "squareFit": 52,
        "ownerName": "Dr Dre",
        "city": "Los Angeles",
        "street": "יונה הנביא",
        "streetNumber": 13,
        "apartmentNumber": 5,
        "Rating": 3.5,
        "listOfReviews": [
            {"_id": "1", "createDate":"2012-04-23T18:25:43.511Z", "userID": "1","uploaderName": "דנה ושגיא", "rentalPeroid": "2018-05-10 - 2019-05-10", "lastRent": 5000, "lastWaterBill": 500, "lastElectricityBill": 600, "lastPropertyTax": 100, "livingExperienceText": "had a blast!" , "recommendationsText": "rent this already!",
                "listOfMalfunctions": [
                    {"_id":"1", "type":"livingExperience", "Text": "החוויה בדירה הייתה נוראית", "photos": [{link: "https://www.kimhi.co.il/Uploads/2019/07/loft%20apartment12.jpg"},{link:"https://www.kimhi.co.il/Uploads/2019/07/loft%20apartment15.jpg"},{link:"https://www.kimhi.co.il/Uploads/2019/07/loft%20apartment10.jpg"}]},
                    {"_id":"2", "type":"recommendations", "Text": "אל תשכרו את הדירה בשום אופן", "photos": []},
                    {"_id":"3", "type":"water", "Text": "זרם זרזיפי במקלחת", "photos": [{link:"https://images.maariv.co.il/image/upload/f_auto,fl_lossy/t_MD_MainArticleFaceDetect/543910"},{link:"https://www.theyeshivaworld.com/wp-content/uploads/2016/10/water-1024x576.jpg"}]},
                    {"_id":"4", "type":"electricity", "Text": "חצי מהמתגים בבית לא מחוברים", "photos": [{link:"https://upload.wikimedia.org/wikipedia/commons/4/4b/Lightning3.jpg"},{link:"https://www.israeldefense.co.il/sites/default/files/styles/full_article_image/public/_Uploads/dbsArticles/bigstock-High-Power-Electricity-Poles-I-253610563_0.jpg?itok=2D_5R47k"}]},
                    {"_id":"5", "type":"construction", "Text": "סדקים בקיר", "photos": [{link:"https://assets.dmagstatic.com/wp-content/uploads/2018/12/dallas-construction-1024x683.jpg"}]}
                ],
                "ratingStatus": 5, "status":"active", contract:"Based 64 encoded image", "identificationCard":" Based 64 encoded image"
            },
            {"_id": "2", "createDate":"2012-04-23T18:25:43.511Z", "userID": "1","uploaderName": "דנה ושגיא", "rentalPeroid": "2018-05-10 - 2019-05-10", "lastRent": 5000, "lastWaterBill": 500, "lastElectricityBill": 600, "lastPropertyTax": 100, "livingExperienceText": "had a blast!" , "recommendationsText": "rent this already!",
                "listOfMalfunctions": [
                    {"_id":"1", "type":"livingExperience", "Text": "החוויה בדירה הייתה נוראית", "photos": [{link: "https://www.kimhi.co.il/Uploads/2019/07/loft%20apartment12.jpg"},{link:"https://www.kimhi.co.il/Uploads/2019/07/loft%20apartment15.jpg"},{link:"https://www.kimhi.co.il/Uploads/2019/07/loft%20apartment10.jpg"}]},
                    {"_id":"2", "type":"recommendations", "Text": "אל תשכרו את הדירה בשום אופן", "photos": []},
                    {"_id":"3", "type":"water", "Text": "זרם זרזיפי במקלחת", "photos": [{link:"https://images.maariv.co.il/image/upload/f_auto,fl_lossy/t_MD_MainArticleFaceDetect/543910"},{link:"https://www.theyeshivaworld.com/wp-content/uploads/2016/10/water-1024x576.jpg"}]},
                    {"_id":"4", "type":"electricity", "Text": "חצי מהמתגים בבית לא מחוברים", "photos": [{link:"https://upload.wikimedia.org/wikipedia/commons/4/4b/Lightning3.jpg"},{link:"https://www.israeldefense.co.il/sites/default/files/styles/full_article_image/public/_Uploads/dbsArticles/bigstock-High-Power-Electricity-Poles-I-253610563_0.jpg?itok=2D_5R47k"}]},
                    {"_id":"5", "type":"construction", "Text": "סדקים בקיר", "photos": [{link:"https://assets.dmagstatic.com/wp-content/uploads/2018/12/dallas-construction-1024x683.jpg"}]}
                ],
                "ratingStatus": 5, "status":"active", contract:"Based 64 encoded image", "identificationCard":" Based 64 encoded image"
            },
            {"_id": "3", "createDate":"2012-04-23T18:25:43.511Z", "userID": "1","uploaderName": "דנה ושגיא", "rentalPeroid": "2018-05-10 - 2019-05-10", "lastRent": 5000, "lastWaterBill": 500, "lastElectricityBill": 600, "lastPropertyTax": 100, "livingExperienceText": "had a blast!" , "recommendationsText": "rent this already!",
                "listOfMalfunctions": [
                    {"_id":"1", "type":"livingExperience", "Text": "החוויה בדירה הייתה נוראית", "photos": [{link: "https://www.kimhi.co.il/Uploads/2019/07/loft%20apartment12.jpg"},{link:"https://www.kimhi.co.il/Uploads/2019/07/loft%20apartment15.jpg"},{link:"https://www.kimhi.co.il/Uploads/2019/07/loft%20apartment10.jpg"}]},
                    {"_id":"2", "type":"recommendations", "Text": "אל תשכרו את הדירה בשום אופן", "photos": []},
                    {"_id":"3", "type":"water", "Text": "זרם זרזיפי במקלחת", "photos": [{link:"https://images.maariv.co.il/image/upload/f_auto,fl_lossy/t_MD_MainArticleFaceDetect/543910"},{link:"https://www.theyeshivaworld.com/wp-content/uploads/2016/10/water-1024x576.jpg"}]},
                    {"_id":"4", "type":"electricity", "Text": "חצי מהמתגים בבית לא מחוברים", "photos": [{link:"https://upload.wikimedia.org/wikipedia/commons/4/4b/Lightning3.jpg"},{link:"https://www.israeldefense.co.il/sites/default/files/styles/full_article_image/public/_Uploads/dbsArticles/bigstock-High-Power-Electricity-Poles-I-253610563_0.jpg?itok=2D_5R47k"}]},
                    {"_id":"5", "type":"construction", "Text": "סדקים בקיר", "photos": [{link:"https://assets.dmagstatic.com/wp-content/uploads/2018/12/dallas-construction-1024x683.jpg"}]}
                ],
                "ratingStatus": 5, "status":"active", contract:"Based 64 encoded image", "identificationCard":" Based 64 encoded image"
            },
        ],
        "photo": "Base64 encoded image 1"
    },
    {"_id": "4",
        "floorNumber": 3,
        "numberOfRooms": 2,
        "squareFit": 52,
        "ownerName": "Dr Dre",
        "city": "Los Angeles",
        "street": "יונה הנביא",
        "streetNumber": 13,
        "apartmentNumber": 5,
        "Rating": 3.5,
        "listOfReviews": [
            {"_id": "1", "createDate":"2012-04-23T18:25:43.511Z", "userID": "1","uploaderName": "דנה ושגיא", "rentalPeroid": "2018-05-10 - 2019-05-10", "lastRent": 5000, "lastWaterBill": 500, "lastElectricityBill": 600, "lastPropertyTax": 100, "livingExperienceText": "had a blast!" , "recommendationsText": "rent this already!",
                "listOfMalfunctions": [
                    {"_id":"1", "type":"livingExperience", "Text": "החוויה בדירה הייתה נוראית", "photos": [{link: "https://www.kimhi.co.il/Uploads/2019/07/loft%20apartment12.jpg"},{link:"https://www.kimhi.co.il/Uploads/2019/07/loft%20apartment15.jpg"},{link:"https://www.kimhi.co.il/Uploads/2019/07/loft%20apartment10.jpg"}]},
                    {"_id":"2", "type":"recommendations", "Text": "אל תשכרו את הדירה בשום אופן", "photos": []},
                    {"_id":"3", "type":"water", "Text": "זרם זרזיפי במקלחת", "photos": [{link:"https://images.maariv.co.il/image/upload/f_auto,fl_lossy/t_MD_MainArticleFaceDetect/543910"},{link:"https://www.theyeshivaworld.com/wp-content/uploads/2016/10/water-1024x576.jpg"}]},
                    {"_id":"4", "type":"electricity", "Text": "חצי מהמתגים בבית לא מחוברים", "photos": [{link:"https://upload.wikimedia.org/wikipedia/commons/4/4b/Lightning3.jpg"},{link:"https://www.israeldefense.co.il/sites/default/files/styles/full_article_image/public/_Uploads/dbsArticles/bigstock-High-Power-Electricity-Poles-I-253610563_0.jpg?itok=2D_5R47k"}]},
                    {"_id":"5", "type":"construction", "Text": "סדקים בקיר", "photos": [{link:"https://assets.dmagstatic.com/wp-content/uploads/2018/12/dallas-construction-1024x683.jpg"}]}
                ],
                "ratingStatus": 5, "status":"active", "contract":"Based 64 encoded image", "identificationCard":" Based 64 encoded image"
            },
            {"_id": "2", "createDate":"2012-04-23T18:25:43.511Z", "userID": "1","uploaderName": "דנה ושגיא", "rentalPeroid": "2018-05-10 - 2019-05-10", "lastRent": 5000, "lastWaterBill": 500, "lastElectricityBill": 600, "lastPropertyTax": 100, "livingExperienceText": "had a blast!" , "recommendationsText": "rent this already!",
                "listOfMalfunctions": [
                    {"_id":"1", "type":"livingExperience", "Text": "החוויה בדירה הייתה נוראית", "photos": [{link: "https://www.kimhi.co.il/Uploads/2019/07/loft%20apartment12.jpg"},{link:"https://www.kimhi.co.il/Uploads/2019/07/loft%20apartment15.jpg"},{link:"https://www.kimhi.co.il/Uploads/2019/07/loft%20apartment10.jpg"}]},
                    {"_id":"2", "type":"recommendations", "Text": "אל תשכרו את הדירה בשום אופן", "photos": []},
                    {"_id":"3", "type":"water", "Text": "זרם זרזיפי במקלחת", "photos": [{link:"https://images.maariv.co.il/image/upload/f_auto,fl_lossy/t_MD_MainArticleFaceDetect/543910"},{link:"https://www.theyeshivaworld.com/wp-content/uploads/2016/10/water-1024x576.jpg"}]},
                    {"_id":"4", "type":"electricity", "Text": "חצי מהמתגים בבית לא מחוברים", "photos": [{link:"https://upload.wikimedia.org/wikipedia/commons/4/4b/Lightning3.jpg"},{link:"https://www.israeldefense.co.il/sites/default/files/styles/full_article_image/public/_Uploads/dbsArticles/bigstock-High-Power-Electricity-Poles-I-253610563_0.jpg?itok=2D_5R47k"}]},
                    {"_id":"5", "type":"construction", "Text": "סדקים בקיר", "photos": [{link:"https://assets.dmagstatic.com/wp-content/uploads/2018/12/dallas-construction-1024x683.jpg"}]}
                ],
                "ratingStatus": 5, "status":"active", "contract":"Based 64 encoded image", "identificationCard":" Based 64 encoded image"
            },
            {"_id": "3", "createDate":"2012-04-23T18:25:43.511Z", "userID": "1","uploaderName": "דנה ושגיא", "rentalPeroid": "2018-05-10 - 2019-05-10", "lastRent": 5000, "lastWaterBill": 500, "lastElectricityBill": 600, "lastPropertyTax": 100, "livingExperienceText": "had a blast!" , "recommendationsText": "rent this already!",
                "listOfMalfunctions": [
                    {"_id":"1", "type":"livingExperience", "Text": "החוויה בדירה הייתה נוראית", "photos": [{link: "https://www.kimhi.co.il/Uploads/2019/07/loft%20apartment12.jpg"},{link:"https://www.kimhi.co.il/Uploads/2019/07/loft%20apartment15.jpg"},{link:"https://www.kimhi.co.il/Uploads/2019/07/loft%20apartment10.jpg"}]},
                    {"_id":"2", "type":"recommendations", "Text": "אל תשכרו את הדירה בשום אופן", "photos": []},
                    {"_id":"3", "type":"water", "Text": "זרם זרזיפי במקלחת", "photos": [{link:"https://images.maariv.co.il/image/upload/f_auto,fl_lossy/t_MD_MainArticleFaceDetect/543910"},{link:"https://www.theyeshivaworld.com/wp-content/uploads/2016/10/water-1024x576.jpg"}]},
                    {"_id":"4", "type":"electricity", "Text": "חצי מהמתגים בבית לא מחוברים", "photos": [{link:"https://upload.wikimedia.org/wikipedia/commons/4/4b/Lightning3.jpg"},{link:"https://www.israeldefense.co.il/sites/default/files/styles/full_article_image/public/_Uploads/dbsArticles/bigstock-High-Power-Electricity-Poles-I-253610563_0.jpg?itok=2D_5R47k"}]},
                    {"_id":"5", "type":"construction", "Text": "סדקים בקיר", "photos": [{link:"https://assets.dmagstatic.com/wp-content/uploads/2018/12/dallas-construction-1024x683.jpg"}]}
                ],
                "ratingStatus": 5, "status":"active", "contract":"Based 64 encoded image", "identificationCard":" Based 64 encoded image"
            },
        ],
        "photo": "Base64 encoded image 1"
    }



];

// const apartments = JSON.parse(this.apartmentsAsJson);

export function getApartments() {
    return apartmentsAsJson;
}

export function getApartment(id) {
    return apartmentsAsJson.find(m => m._id === id);
}
export function getFullAddress({street, streetNumber,city,apartmentNumber}) {
    const result = street + ' ' + streetNumber + ' ' + city + ' ' +  'דירה: ' + apartmentNumber;
    return result;
}

export function getLatestPayments(apartment) {
    let reviews = {...apartment.listOfReviews};
    reviews= _.orderBy(reviews, "_id", 'desc');
    const latestReview = {...reviews[0]};
    return {latestRent: latestReview.lastRent, latestWaterBill: latestReview.lastWaterBill, latestElectricityBill: latestReview.lastElectricityBill, latestPropertyTax: latestReview.lastPropertyTax};
}

export function getCities() {
    return [{name: 'תל אביב'},{name: 'חיפה'},{name: 'ראשון'},{name: 'מזכרת בתיה'}]
}

export function getMalfunctions() {
    return [{name: 'צנרת או מים ', key: 'water'},{name: 'חשמל' , key: 'electricity'},{name: 'בניה' , key: 'construction'},{name: 'על הבעלים' , key: 'owner'},{name: 'על השכנים' , key: 'neighbors'},{name: 'על האזור' , key: 'area'},{name: 'מפגעים בדירה' , key: 'problems'}]

}
export function getMalfunctionKey(name){
    const malfunctions = this.getMalfunctions();
    const key = malfunctions[name].key;
    return key
}
export function getDefaultMalfunctions() {
    const malfunctions =[
        {
        name:'livingExperience',
        text:'',
        key: 'livingExperience',
        files:[]
        },
        {
            name:'recommendations',
            text:'',
            key: 'recommendations',
            files:[]
        }
    ]
    return malfunctions;
}
export function getMalfunctionProps(key) {
    let result = '';
    switch (key) {
        case 'water':return {headline:'צנרת או מים'};
        case 'livingExperience': return {headline:'איך היה לגור בדירה?',subHeadline:'ספר לנו באופן כללי איך היה לגור בדירה, תנסה לסכם את חווית המגורים בלי להיכנס למקרים ספציפיים – עליהם תוכל לכתוב בהמשך'};
        case 'electricity': return {headline:'חשמל'};
        case 'recommendations': return {headline:'המלצות',subHeadline:'מה הייתם ממליצים למי ששוקל לשכור את הדירה?'};
        case 'owner': return {headline:'על הבעלים'};
        case 'neighbors': return {headline:'על השכנים'};
        case 'area': return {headline:'על האזור'};
        case 'construction': return {headline:'בעיות בבניה'};
        case 'problems': return {headline:'מפגעים בדירה'};

    }
}
function buildApartmentIdUrl(apartmentId) {
    const result = apiEndpoint + '/' + apartmentId;
    return result;
}
export function saveApartmentReview(apartment) {
    if(apartment._id){
        const body = {...apartment};
        delete body._id;
        return httpService.put(buildApartmentIdUrl(apartment._id), body )
    }

    return  httpService.post(apiEndpoint , apartment)
}
//
// export function saveMovie(movie) {
//     let movieInDb = movies.find(m => m._id === movie._id) || {};
//     movieInDb.title = movie.title;
//     movieInDb.genre = genresAPI.genres.find(g => g._id === movie.genreId);
//     movieInDb.numberInStock = movie.numberInStock;
//     movieInDb.dailyRentalRate = movie.dailyRentalRate;
//
//     if (!movieInDb._id) {
//         movieInDb._id = Date.now().toString();
//         movies.push(movieInDb);
//     }
//
//     return movieInDb;
// }
//
// export function deleteMovie(id) {
//     let movieInDb = movies.find(m => m._id === id);
//     movies.splice(movies.indexOf(movieInDb), 1);
//     return movieInDb;
// }
