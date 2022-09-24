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
  @ApiOperation({ summary: 'Get all projects' })
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
  @ApiOperation({ summary: 'Get specific project' })
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
  @ApiOperation({ summary: 'Create a project' })
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

  @Put('/:id')
  @ApiOperation({ summary: 'Edit a project' })
  @ApiResponse({ status: 403, description: "Invalid credentials"})
  @ApiResponse({ status: 200, description: "Success Response"})
  @ApiHeader({ name: 'Authorization', description: 'Authorization Code'})
  async editProject(
    @Body() task: CreateTaskDTO,
    @Param('id') id: string,
    @Request() req: any,
  ) { 
    return this.tasksService.editTask(req.user.id, id, task);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a project' })
  @ApiResponse({ status: 403, description: "Invalid credentials"})
  @ApiResponse({ status: 204, description: "Project deleted"})
  @ApiHeader({ name: 'Authorization', description: 'Authorization Code'})
  async deleteProject(
    @Param('id') id: string,
    @Request() req: any,
  ) { 
    return this.tasksService.deleteProject(req.user.id, id);
  }
}