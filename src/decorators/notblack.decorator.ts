import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function NotBlack(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'NotBlack',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: any) {
                    if(typeof value !== 'string') return false;
                    const valueTRim = value.replace(/ /g, '');
                    if(valueTRim ==='') return false;
                    return true;
                },
            },
        });
    };
}