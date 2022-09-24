import { Body, Controller, Delete, Get, Header, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { ApiHeader, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "src/utils/guards/AuthGuard";
import { CreateProjectDTO } from "./dtos/CreateProject";
import { ProjectsServices } from "./projects.service";

@Controller('/projects')
@ApiTags('Projects')
@UseGuards(AuthGuard)
export class ProjectsController {

  constructor(
    protected readonly projectsServices: ProjectsServices,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all projects' })
  @ApiResponse({ status: 403, description: "Invalid credentials"})
  @ApiResponse({ status: 200, description: "Success Response"})
  @ApiHeader({ name: 'Authorization', description: 'Authorization Code'})
  async getProjects(
    @Request() req: any,
  ) {
    return this.projectsServices.getProjects(req.user);
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
    return this.projectsServices.getProject(req.user, id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a project' })
  @ApiResponse({ status: 403, description: "Invalid credentials"})
  @ApiResponse({ status: 200, description: "Success Response"})
  @ApiHeader({ name: 'Authorization', description: 'Authorization Code'})
  async createProject(
    @Body() project: CreateProjectDTO,
    @Request() req: any,
  ) {
    return this.projectsServices.createProject(req.user.id, project);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Edit a project' })
  @ApiResponse({ status: 403, description: "Invalid credentials"})
  @ApiResponse({ status: 200, description: "Success Response"})
  @ApiHeader({ name: 'Authorization', description: 'Authorization Code'})
  async editProject(
    @Body() project: CreateProjectDTO,
    @Param('id') id: string,
    @Request() req: any,
  ) { 
    return this.projectsServices.editProject(req.user.id, id, project);
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
    return this.projectsServices.deleteProject(req.user.id, id);
  }
}