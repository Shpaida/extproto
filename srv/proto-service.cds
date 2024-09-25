using {ECPersonalInformation as external} from './external/ECPersonalInformation';

@requires: 'authenticated-user'
service ProtoService {
    entity Employees as
        projection on external.PerPersonal {
            key personIdExternal,
                firstName,
                lastName,
                middleName
        };
}
