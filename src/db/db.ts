import Dexie, { Table } from 'dexie';

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
}
export interface WaitRequest {
  id?: number;
  userId: number;
  done?: boolean;
}
export interface Hospital {
  id?: number;
  name: string;
  addressLineOne: string;
  addressLineTwo: string;
  postcode: string;
  phoneNumber: string;
}

export class AppDB extends Dexie {
  users!: Table<User, number>;
  waitRequests!: Table<WaitRequest, number>;
  hospitals!: Table<Hospital, number>;

  constructor() {
    super('ngdexieliveQuery');
    this.version(3).stores({
      users: '++id',
      todoItems: '++id, todoListId',
    });
    this.on('populate', () => this.populate());
  }

  async populate() {
    // Create Hospitals
    await db.hospitals.bulkAdd([
      {
        name: 'Cobequid Community Health Centre',
        addressLineOne: '40 Freer Lane',
        addressLineTwo: 'Lower Sackville',
        postcode: 'B4C 0A2',
        phoneNumber: '902-869-6100',
      },
      {
        name: 'Dartmouth General Hospital',
        addressLineOne: '325 Pleasant Street',
        addressLineTwo: 'Dartmouth',
        postcode: 'B2Y 4G8',
        phoneNumber: '902-465-8300',
      },
      {
        name: 'Eastern Shore Memorial Hospital',
        addressLineOne: '22637 #7 Highway',
        addressLineTwo: 'Sheet Harbour',
        postcode: 'B0N 2T0',
        phoneNumber: '902- 885-2554',
      },
      {
        name: 'Hants Community Hospital',
        addressLineOne: '89 Payzant Drive',
        addressLineTwo: 'Windsor',
        postcode: 'B0N 2T0',
        phoneNumber: '902-792-2000',
      },
      {
        name: 'Musquodoboit Valley Memorial Hospital',
        addressLineOne: '492 Archibald Brook Road',
        addressLineTwo: 'Middle Musquodoboit',
        postcode: 'B0N 1X0',
        phoneNumber: '902-384-2220',
      },
      {
        name: 'QEII Health Sciences Centre',
        addressLineOne: '1799 Robie Street',
        addressLineTwo: 'Halifax',
        postcode: 'B3H 2E2',
        phoneNumber: '902-473-2700',
      },
      {
        name: 'The Nova Scotia Hospital',
        addressLineOne: '300 Pleasant Street',
        addressLineTwo: 'Dartmouth',
        postcode: 'B2Y 3Z9',
        phoneNumber: '902-464-3111',
      },
      {
        name: 'Twin Oaks Memorial Hospital',
        addressLineOne: '7702 #7 Highway',
        addressLineTwo: 'Musquodoboit Harbour',
        postcode: 'B0J 2L0',
        phoneNumber: '902-889-4110',
      },
      {
        name: 'IWK Health Centre',
        addressLineOne: '5850/5980 University Avenue',
        addressLineTwo: 'Halifax',
        postcode: 'B3K 6R8',
        phoneNumber: '902-470-8888',
      },
    ]);

    // Create User
    const userId = await db.users.add({
      firstName: 'John',
      lastName: 'Smith',
    });

    // Create wait request
    await db.waitRequests.add({
      userId,
    });
  }

  async resetWaitRequests() {
    await db.transaction('rw', 'users', 'waitRequests', 'hospitals', () => {
      this.users.clear();
      this.waitRequests.clear();
      this.hospitals.clear();
      this.populate();
    });
  }
}

export const db = new AppDB();
