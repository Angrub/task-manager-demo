import { body, header, param } from 'express-validator';

const sessionValidator = [
    header('session').exists({checkFalsy: true}).isString().isLength({max: 255}),
];

const idValidator = [
    param('id').exists({checkFalsy: true}).isInt({min: 0})
];

const dtoValidator = [
    body('title').exists({checkFalsy: true}).isString().isLength({max: 45}),
    body('description').exists({checkFalsy: true}).isString().isLength({min: 1}),
    body('status').optional().custom(value => {
        const possibleValues = ['to-do', 'in-progress', 'done', 'locked'];
        if(!possibleValues.includes(value)) throw new Error('Status is not valid');
        return true;
    }),
    body('deadline').isISO8601(),
    body('comments').optional().isString().isLength({min: 1}),
    body('owner').optional().isString().isLength({max: 45}),
    body('tags').optional().isString().isLength({min: 1}),
];

export {
    sessionValidator,
    idValidator,
    dtoValidator
}