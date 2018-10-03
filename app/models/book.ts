import * as mongoose from 'mongoose';
import {Document, Model, Schema} from 'mongoose';
import {Rating} from "./rating";

export interface IBook extends Document {
    title: string;
    ISBN: string;
    numberOfPages?: number;
    rating?: Rating;
}

const bookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    ISBN: {
        type: String,
        required: true,
        validate: {
            validator: function(value) {
                return new RegExp('ISBN(?:-13)?:?\x20*(?=.{17}$)97(?:8|9)([ -])\\d{1,5}\\1\\d{1,7}\\1\\d{1,6}\\1\\d$')
                    .test(value);
            },
            message: props => `${props.value} is not a valid ISBN number! We support only ISBN13 format. 
                Correct sample is: ISBN-13: 978-1-56619-909-3.`
        },
    },
    numberOfPages: {
        type: Number,
    },
    rating: {
        type: Rating
    }
});

export const Book = mongoose.model<IBook>("Book", bookSchema);