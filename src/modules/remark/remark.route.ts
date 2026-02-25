// remark.route.ts
import { Router } from 'express';
import { RemarkController } from './remark.controller';

const remarkRouter = Router();

remarkRouter.post('/complaints/:complaintId/remarks', RemarkController.addRemark);
remarkRouter.get('/complaints/:complaintId/remarks', RemarkController.getRemarks);
remarkRouter.delete('/remarks/:id', RemarkController.deleteRemark);

export default remarkRouter;