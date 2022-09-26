import { Body, Controller, Delete, Get, Header, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/utils/guards/AuthGuard";
import { CreateTaskDTO } from "./dtos/CreateTask";
import { TasksServices } from "./tasks.service";

@Controller('/projects/:projectId/tasks')
@ApiTags('Tasks')
@UseGuards(AuthGuard)
export class TasksController {

  constructor(
    protected readonly tasksService: TasksServices,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  @ApiResponse({ status: 403, description: "Invalid credentials"})
  @ApiResponse({ status: 200, description: "Success Response"})
  @ApiHeader({ name: 'Authorization', description: 'Authorization Code'})
  async getProjects(
    @Param('projectId') id: number,
    @Request() req: any,
  ) {
    return this.tasksService.getTasks(req.user, id);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get specific task' })
  @ApiResponse({ status: 403, description: "Invalid credentials"})
  @ApiResponse({ status: 200, description: "Success Response"})
  @ApiHeader({ name: 'Authorization', description: 'Authorization Code'})
  async getProject(
    @Param('id') id: string,
    @Request() req: any,
  ) {
    return this.tasksService.getTask(req.user, id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a task' })
  @ApiResponse({ status: 403, description: "Invalid credentials"})
  @ApiResponse({ status: 200, description: "Success Response"})
  @ApiHeader({ name: 'Authorization', description: 'Authorization Code'})
  async createProject(
    @Body() task: CreateTaskDTO,
    @Param('projectId') id: number,
    @Request() req: any,
  ) {
    return this.tasksService.createTask(req.user.id, id, task);
  }


  @Post('/:id/finish')
  @ApiOperation({ summary: 'Finish a task' })
  @ApiResponse({ status: 403, description: "Invalid credentials"})
  @ApiResponse({ status: 200, description: "Success Response"})
  @ApiHeader({ name: 'Authorization', description: 'Authorization Code'})
  async finishTask(
    @Param('id') id: string,
    @Request() req: any,
  ) { 
    return this.tasksService.finishTask(req.user.id, id);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Edit a task' })
  @ApiResponse({ status: 403, description: "Invalid credentials"})
  @ApiResponse({ status: 200, description: "Success Response"})
  @ApiHeader({ name: 'Authorization', description: 'Authorization Code'})
  async editTask(
    @Body() task: CreateTaskDTO,
    @Param('id') id: string,
    @Request() req: any,
  ) { 
    return this.tasksService.editTask(req.user.id, id, task);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a Task' })
  @ApiResponse({ status: 403, description: "Invalid credentials"})
  @ApiResponse({ status: 204, description: "Task deleted"})
  @ApiHeader({ name: 'Authorization', description: 'Authorization Code'})
  async deleteTask(
    @Param('id') id: string,
    @Request() req: any,
  ) { 
    return this.tasksService.deleteTasks(req.user.id, id);
  }
}