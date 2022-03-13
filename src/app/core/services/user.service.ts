import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'src/db/db';

@Injectable()
export class UserService {

    execChange: Subject<any> = new Subject<any>();

    constructor() { }

    userChange(data?: User) {
        this.execChange.next(data);
    }
}