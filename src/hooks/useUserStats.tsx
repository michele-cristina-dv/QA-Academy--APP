
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export const useUserStats = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: stats, isLoading } = useQuery({
    queryKey: ['userStats', user?.id],
    queryFn: async () => {
      if (!user) return null;
      
      console.log('Fetching user stats for:', user.id);
      const { data, error } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      if (error) {
        console.error('Error fetching user stats:', error);
        throw error;
      }
      
      console.log('User stats fetched:', data);
      return data;
    },
    enabled: !!user,
  });

  const updateStatsMutation = useMutation({
    mutationFn: async (updates: any) => {
      if (!user) throw new Error('User not authenticated');
      
      console.log('Updating user stats:', updates);
      const { error } = await supabase
        .from('user_stats')
        .update(updates)
        .eq('user_id', user.id);

      if (error) throw error;
    },
    onSuccess: () => {
      console.log('User stats updated successfully');
      queryClient.invalidateQueries({ queryKey: ['userStats', user?.id] });
    },
    onError: (error) => {
      console.error('Error updating user stats:', error);
    },
  });

  return {
    stats,
    isLoading,
    updateStats: updateStatsMutation.mutate,
  };
};
