import { Observable } from 'rxjs';
import { Option } from '../model/option';

export abstract class FilterValuesService {

  abstract getValues(id: any): Observable<Option>;

}
