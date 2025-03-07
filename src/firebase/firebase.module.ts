import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { FireBaseService } from './firebase.service';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [forwardRef(() => UsersModule), ConfigModule.Deferred],
  providers: [FireBaseService],
  exports: [FireBaseService],
})
export class FireBaseModule {}
