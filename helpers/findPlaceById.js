// Принимет массив beds и id
//Возвращает объект из массива places, у которого искомый id

const findPlaceById = (beds, id) => {
    let result;
    beds.forEach((bed) => {
        bed.places.forEach(place => {
            if(String(place.id) === id)
            result = place
        });
        
    });
    return result; 
}

module.exports = findPlaceById;