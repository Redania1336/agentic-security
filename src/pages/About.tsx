
import { Shield, Book, Globe, Github, Mail, User, Lightbulb, Code } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

const About = () => {
  return (
    <AppShell>
      <div className="container px-4 py-12 md:py-24 max-w-5xl mx-auto">
        <div className="space-y-6 mb-12">
          <div className="flex items-center gap-3">
            <Shield className="h-8 w-8 text-primary-blue" />
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">About Agentic Security Scanner</h1>
          </div>
          <Separator />
          <p className="text-lg text-muted-foreground">
            A powerful, AI-driven security tool built to help developers identify and remediate vulnerabilities in their code repositories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary-blue" />
                Built with OpenAI Agents
              </CardTitle>
              <CardDescription>
                Leveraging the power of AI for advanced security analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Agentic Security Scanner uses cutting-edge OpenAI agent technology to analyze code repositories with human-like understanding, identifying security vulnerabilities that traditional scanners might miss.
              </p>
              <p>
                By combining vector search capabilities with AI agents, the scanner can detect patterns of vulnerabilities and provide intelligent remediation suggestions tailored to your codebase.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5 text-primary-blue" />
                Key Features
              </CardTitle>
              <CardDescription>
                What makes our scanner unique
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex gap-2">
                  <span className="text-primary-blue">•</span>
                  <span>Static code analysis for secrets and vulnerabilities</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary-blue">•</span>
                  <span>Dependency scanning for known CVEs</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary-blue">•</span>
                  <span>Configuration analysis for security best practices</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary-blue">•</span>
                  <span>AI-powered pattern matching using vector similarity</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary-blue">•</span>
                  <span>Real-time CVE lookup with OpenAI web search</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary-blue">•</span>
                  <span>GitHub issue creation for critical findings</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8 mb-16">
          <h2 className="text-2xl font-bold tracking-tight">Open Source Project</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="bg-primary-blue/10 rounded-full p-6">
                  <Github className="h-12 w-12 text-primary-blue" />
                </div>
                <div className="space-y-4 flex-1">
                  <p>
                    Agentic Security Scanner is an open-source project, freely available on GitHub. We welcome contributions from the community to help improve and expand the tool's capabilities.
                  </p>
                  <p>
                    Visit our GitHub repository to see the source code, report issues, or contribute to the development.
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="gap-2" 
                    onClick={() => window.open('https://github.com/agenticsorg/agentic-security', '_blank')}
                  >
                    <Github className="h-4 w-4" /> View on GitHub
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8 mb-16">
          <h2 className="text-2xl font-bold tracking-tight">Created By</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="bg-primary-blue/10 rounded-full p-6">
                  <User className="h-12 w-12 text-primary-blue" />
                </div>
                <div className="space-y-4 flex-1">
                  <div>
                    <h3 className="text-xl font-medium">rUv</h3>
                    <p className="text-muted-foreground">Creator of Agentic Security Scanner</p>
                  </div>
                  <p>
                    Developed with the support of the Agentics Foundation (Agentics.org), 
                    dedicated to advancing AI agent technology for security and developer tools.
                  </p>
                  <div className="flex gap-4">
                    <Button variant="outline" size="sm" className="gap-2">
                      <Github className="h-4 w-4" /> GitHub
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Mail className="h-4 w-4" /> Contact
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl font-bold tracking-tight">About the Agentics Foundation</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="bg-primary-blue/10 rounded-full p-6">
                  <Globe className="h-12 w-12 text-primary-blue" />
                </div>
                <div className="space-y-4 flex-1">
                  <p>
                    The Agentics Foundation (Agentics.org) is dedicated to advancing the development 
                    and ethical use of AI agent technology. Through research, open-source projects, 
                    and community engagement, the foundation aims to ensure AI agents enhance 
                    human capabilities and contribute positively to society.
                  </p>
                  <Button variant="outline" size="sm" className="gap-2" onClick={() => window.open('https://agentics.org', '_blank')}>
                    <Globe className="h-4 w-4" /> Visit Agentics.org
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
};

export default About;
