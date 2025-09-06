
export type Status = 'online' | 'offline' | 'permission_needed';

export interface ChildProfile {
  id: string;
  name: string;
  avatarSeed: string;
  grade: string;
  status: Status;
}

export let mockChildren: ChildProfile[] = [
  { id: '1', name: 'ゆうと', avatarSeed: 'yuto', grade: '小学校高学年', status: 'online' },
  { id: '2', name: 'はな', avatarSeed: 'hana', grade: '中学生', status: 'permission_needed' },
];
