
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export const useChallenges = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: challenges, isLoading } = useQuery({
    queryKey: ['challenges'],
    queryFn: async () => {
      console.log('Fetching challenges...');
      const { data, error } = await supabase
        .from('challenges')
        .select('*')
        .order('difficulty', { ascending: true });

      if (error) {
        console.error('Error fetching challenges:', error);
        throw error;
      }
      console.log('Challenges fetched:', data);
      return data;
    },
  });

  const { data: progress } = useQuery({
    queryKey: ['challengeProgress', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      console.log('Fetching progress for user:', user.id);
      const { data, error } = await supabase
        .from('user_challenge_progress')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error fetching progress:', error);
        throw error;
      }
      console.log('Progress fetched:', data);
      return data;
    },
    enabled: !!user,
  });

  const startChallengeMutation = useMutation({
    mutationFn: async (challengeId: string) => {
      if (!user) throw new Error('User not authenticated');
      
      console.log('Starting challenge:', challengeId, 'for user:', user.id);
      
      // Check if progress already exists
      const { data: existingProgress } = await supabase
        .from('user_challenge_progress')
        .select('*')
        .eq('user_id', user.id)
        .eq('challenge_id', challengeId)
        .single();

      if (existingProgress) {
        console.log('Progress already exists, updating...');
        const { error } = await supabase
          .from('user_challenge_progress')
          .update({
            completed: false,
            score: null,
            completed_at: null,
          })
          .eq('user_id', user.id)
          .eq('challenge_id', challengeId);
        
        if (error) throw error;
      } else {
        console.log('Creating new progress...');
        const { error } = await supabase
          .from('user_challenge_progress')
          .insert({
            user_id: user.id,
            challenge_id: challengeId,
            completed: false,
          });

        if (error) throw error;
      }
    },
    onSuccess: () => {
      console.log('Challenge started successfully');
      queryClient.invalidateQueries({ queryKey: ['challengeProgress', user?.id] });
    },
    onError: (error) => {
      console.error('Error starting challenge:', error);
    },
  });

  const completeChallengeMutation = useMutation({
    mutationFn: async ({ challengeId, score }: { challengeId: string; score: number }) => {
      if (!user) throw new Error('User not authenticated');
      
      console.log('Completing challenge:', challengeId, 'with score:', score);
      
      const { error } = await supabase
        .from('user_challenge_progress')
        .update({
          completed: true,
          score,
          completed_at: new Date().toISOString(),
        })
        .eq('user_id', user.id)
        .eq('challenge_id', challengeId);

      if (error) throw error;
    },
    onSuccess: () => {
      console.log('Challenge completed successfully');
      queryClient.invalidateQueries({ queryKey: ['challengeProgress', user?.id] });
      queryClient.invalidateQueries({ queryKey: ['userStats', user?.id] });
    },
    onError: (error) => {
      console.error('Error completing challenge:', error);
    },
  });

  return {
    challenges,
    progress,
    isLoading,
    startChallenge: startChallengeMutation.mutate,
    completeChallenge: completeChallengeMutation.mutate,
    isStarting: startChallengeMutation.isPending,
  };
};
