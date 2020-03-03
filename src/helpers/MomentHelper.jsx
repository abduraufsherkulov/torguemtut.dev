import moment from 'moment';

export const momentize = (date) => {
    return moment(date).format('LLLL')
}